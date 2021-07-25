import {Target, Targets} from "./Target";
import {ProjectOptions} from "./ProjectOptions";
import {InternalTarget} from "./InternalTarget";
import * as NestedError from "nested-error-stacks";

interface AutoTarget {
    target: Target;
    complete: boolean;
}

export type AutoTargets = { [name: string]: AutoTarget };

export class Auto {
    private projectOptions: ProjectOptions;
    private autoTargets: AutoTargets = {};

    constructor(projectOptions: ProjectOptions) {
        this.projectOptions = projectOptions;
    }

    async addTarget(target: InternalTarget) {
        if (!target.name) {
            this.projectOptions.logger.error('Invalid target', target);
            throw new Error(`'name' is required on target.`);
        }

        if (target.name in this.autoTargets) {
            return;
        }

        this.autoTargets[target.name] = {
            complete: false,
            target
        };
    }

    async run() {
        await this.resolveRequisites();

        let allComplete = Object.keys(this.autoTargets).length === 0;
        while (!allComplete) {
            allComplete = true;
            let progressMade = false;
            for (let autoTargetName of Object.keys(this.autoTargets)) {
                try {
                    const autoTarget = this.autoTargets[autoTargetName];
                    if (autoTarget.complete) {
                        continue;
                    }
                    allComplete = false;
                    if (!this.preRequisitesComplete(autoTarget)) {
                        continue;
                    }

                    this.projectOptions.logger.info(`Running target: ${autoTargetName}`);
                    if (autoTarget.target.run) {
                        const newTargets = await autoTarget.target.run(this.projectOptions);
                        if (newTargets) {
                            await this.addTargets(newTargets, autoTarget.target);
                        }
                    }

                    autoTarget.complete = true;
                    progressMade = true;
                } catch (err) {
                    throw new NestedError(`Failed to process "${autoTargetName}"`, err);
                }
            }

            if (!allComplete && !progressMade) {
                let message = 'Stuck processing targets, waiting for: ';
                for (let autoTargetName of Object.keys(this.autoTargets)) {
                    const autoTarget = this.autoTargets[autoTargetName];
                    if (autoTarget.complete) {
                        continue;
                    }
                    message += `\n  - ${autoTargetName} pre: [${(<string[]>autoTarget.target.preRequisites).join(', ')}] post: [${(<string[]>autoTarget.target.postRequisites).join(', ')}]`;
                }
                throw new Error(message);
            }
        }
    }

    private async resolveRequisites() {
        let complete = false;
        while (!complete) {
            complete = true;
            for (let autoTargetName of Object.keys(this.autoTargets)) {
                const autoTarget = this.autoTargets[autoTargetName];

                for (let preRequisiteName of (<string[]>autoTarget.target.preRequisites)) {
                    if (!(preRequisiteName in this.autoTargets)) {
                        const projectTarget = this.projectOptions.targets[preRequisiteName];
                        if (!projectTarget) {
                            throw new Error(`Could not find pre-requisite target "${preRequisiteName}" (resolveRequisites)`);
                        }
                        await this.addTarget(projectTarget);
                        complete = false;
                    }
                }

                for (let projectTargetName of Object.keys(this.projectOptions.targets)) {
                    const projectTarget = this.projectOptions.targets[projectTargetName];
                    if ((<string[]>(projectTarget.postRequisites || [])).indexOf(autoTargetName) >= 0) {
                        await this.addTarget(projectTarget);
                        if (!(<string[]>autoTarget.target.preRequisites).includes(projectTargetName)) {
                            (<string[]>autoTarget.target.preRequisites).push(projectTargetName);
                            complete = false;
                        }
                    }
                }
            }
        }
    }

    private preRequisitesFullfilled(autoTarget: AutoTarget) {
        return (<string[]>autoTarget.target.preRequisites).every(preRequisiteTargetName => {
            const preRequisiteAutoTarget = this.autoTargets[preRequisiteTargetName];
            if (!preRequisiteAutoTarget) {
                throw new Error(`Could not find pre-requisite target "${preRequisiteTargetName}" (preRequisitesFullfilled)`);
            }
            return preRequisiteAutoTarget.complete;
        });
    }

    private postRequisitesFullfilled(autoTarget: AutoTarget) {
        return (<string[]>autoTarget.target.postRequisites).every(postRequisiteTargetName => {
            const postRequisiteAutoTarget = this.autoTargets[postRequisiteTargetName];
            if (!postRequisiteAutoTarget) {
                throw new Error(`Could not find post-requisite target "${postRequisiteTargetName}"`);
            }
            return postRequisiteAutoTarget.complete;
        });
    }

    private preRequisitesComplete(autoTarget: AutoTarget) {
        return (<string[]>autoTarget.target.preRequisites).every(preRequisiteTargetName => {
            const preRequisiteAutoTarget = this.autoTargets[preRequisiteTargetName];
            if (!preRequisiteAutoTarget) {
                throw new Error(`Could not find pre-requisite target "${preRequisiteTargetName}" (preRequisitesComplete)`);
            }
            return preRequisiteAutoTarget.complete;
        });
    }

    private postRequisitesComplete(autoTarget: AutoTarget) {
        return (<string[]>autoTarget.target.postRequisites).every(postRequisiteTargetName => {
            const postRequisiteAutoTarget = this.autoTargets[postRequisiteTargetName];
            if (!postRequisiteAutoTarget) {
                throw new Error(`Could not find post-requisite target "${postRequisiteTargetName}"`);
            }
            return postRequisiteAutoTarget.complete;
        });
    }

    private async addTargets(newTargets: void | Targets | string[] | string, sourceTarget: InternalTarget) {
        if (newTargets instanceof Promise) {
            newTargets = await newTargets;
        }
        if (Array.isArray(newTargets)) {
            for (let target of newTargets) {
                await this.addTargets(target, sourceTarget);
            }
        } else {
            for (let targetName of  Object.keys(<Targets>newTargets)) {
                const target = (<Targets>newTargets)[targetName];
                await this.projectOptions.addTarget(targetName, target, sourceTarget.sourceComponent);
                await this.addTarget(target);
            }
        }
        await this.resolveRequisites();
    }
}
