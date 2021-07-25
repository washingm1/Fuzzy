import {ProjectOptions} from "./ProjectOptions";
import * as yargs from "yargs";
import {ArgumentParser} from "./ArgumentParser";
import {ComponentLoader} from "./ComponentLoader";
import {Logger} from "./Logger";
import {Auto} from "./Auto";
import {InternalTarget} from "./InternalTarget";
import {InternalComponent} from "./InternalComponent";
import {Component} from "../pango-component";
import {Target} from "./Target";
import * as fs from "fs-extra";
import * as yaml from "js-yaml";
import * as deepmerge from "deepmerge";
import * as os from "os";
import * as path from "path";

async function addTarget(targetName: string, target: Target, sourceComponent?: Component): Promise<void> {
    (<InternalTarget>target).name = targetName;
    (<InternalTarget>target).sourceComponent = <InternalComponent>sourceComponent;
    const previousTarget: InternalTarget = this.targets[targetName];
    if (previousTarget) {
        const previousComponent: InternalComponent = previousTarget.sourceComponent;
        const previousComponentPath = previousComponent ? previousComponent.componentPath : 'internal';
        const sourceComponentPath = (<InternalComponent>sourceComponent).componentPath;
        if (!(await isSameComponent(sourceComponentPath, previousComponentPath))) {
            throw new Error(`Duplicate targets found. Target name ${targetName}.\n  - ${sourceComponentPath}\n  - ${previousComponentPath}`);
        }
    }
    this.targets[targetName] = target;

    let preRequisites;
    if (target.preRequisites) {
        if (typeof target.preRequisites === 'function') {
            const t = await target.preRequisites(this._projectOptions);
            preRequisites = t ? t : [];
        } else {
            preRequisites = target.preRequisites;
        }
    }
    target.preRequisites = preRequisites || [];

    let postRequisites;
    if (target.postRequisites) {
        if (typeof target.postRequisites === 'function') {
            const t = await target.postRequisites(this._projectOptions);
            postRequisites = t ? t : [];
        } else {
            postRequisites = target.postRequisites;
        }
    }
    target.postRequisites = postRequisites || [];
}

async function isSameComponent(sourceComponentPath: string, previousComponentPath: string): Promise<boolean> {
    if (previousComponentPath === sourceComponentPath) {
        return true;
    }

    const [sourceComponentSource, previousComponentSource] = await Promise.all([
        fs.readFile(sourceComponentPath, 'utf8'),
        fs.readFile(previousComponentPath, 'utf8')
    ]);

    return sourceComponentSource === previousComponentSource;
}

export class Pango {
    async run(projectOptions: ProjectOptions) {
        try {
            projectOptions = await this.applyUserConfig(projectOptions);
            projectOptions.appPath = await this.ensureAppPath(projectOptions);
            projectOptions.addTarget = addTarget.bind(projectOptions);
            projectOptions.logger = new Logger(projectOptions);
            projectOptions.targets = projectOptions.targets || {};
            const args: string[] = projectOptions.args || process.argv.slice(2);
            const dashedArgs = ArgumentParser.getDashedArgs(args);
            projectOptions.requestedTargets = ArgumentParser.getNonDashedArgs(args);
            if (!projectOptions.requestedTargets || projectOptions.requestedTargets.length === 0) {
                projectOptions.requestedTargets = projectOptions.defaultTargets;
                if (!projectOptions.requestedTargets || projectOptions.requestedTargets.length === 0) {
                    projectOptions.requestedTargets = ['build'];
                }
            }

            const opts = <any>yargs
                .option('v', {
                    alias: 'verbose',
                    describe: 'sets the log level to debug',
                    type: 'boolean'
                })
                .option('loglevel', {
                    describe: 'sets the log level',
                    choices: ['debug', 'info', 'warn', 'error'],
                    type: 'string',
                    default: 'info'
                })
                .option('j', {
                    alias: 'concurrency',
                    describe: 'number of multiple items to run at once',
                    type: 'number',
                    default: 1
                })
                .parse(dashedArgs);
            projectOptions.logLevel = ('verbose' in opts && opts.verbose)
                ? 'debug'
                : ('loglevel' in opts)
                    ? opts.loglevel
                    : 'info';
            projectOptions.concurrency = opts.concurrency || 1;

            for (let targetName of Object.keys(projectOptions.targets)) {
                const target: InternalTarget = projectOptions.targets[targetName];
                target.preRequisites = target.preRequisites || [];
                target.postRequisites = target.postRequisites || [];
                target.name = target.name || targetName;
            }

            await ComponentLoader.loadComponents(projectOptions);
            await this.runTargets(projectOptions);
        } catch (err) {
            if (!projectOptions || projectOptions.logLevel === 'debug') {
                console.error(err);
            } else {
                console.error(err.message ? err.message : err);
            }
            process.exit(err.errorCode || 1);
        }
    }

    private async runTargets(projectOptions: ProjectOptions): Promise<void> {
        const auto = new Auto(projectOptions);
        for (let requestedTarget of projectOptions.requestedTargets) {
            const target: InternalTarget = projectOptions.targets[requestedTarget];
            if (!target) {
                throw new Error(`Unknown target "${requestedTarget}", available targets [${Object.keys(projectOptions.targets)}]`);
            }
            await auto.addTarget(target);
        }
        await auto.run();
    }

    private async applyUserConfig(projectOptions: ProjectOptions) {
        const userConfigFileName = projectOptions.userConfigFileName || 'pango.user.yml';
        if (!(await fs.pathExists(userConfigFileName))) {
            return projectOptions;
        }
        const userConfigData = await fs.readFile(userConfigFileName, 'utf8');
        const userConfig = yaml.safeLoad(userConfigData);
        return deepmerge(projectOptions, userConfig);
    }

    private async ensureAppPath(projectOptions: ProjectOptions): Promise<string> {
        if (!projectOptions.appPath) {
            const homeDir = os.homedir();
            projectOptions.appPath = path.join(homeDir, '.pango');
        }
        await fs.mkdirs(projectOptions.appPath);
        return projectOptions.appPath;
    }
}
