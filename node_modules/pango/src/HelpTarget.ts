import {Target, Targets} from "./Target";
import {ProjectOptions} from "./ProjectOptions";
import {Logger} from "./Logger";

export class HelpTarget implements Target {
    helpMessage: string = 'Prints help message';
    preRequisites = ['initialize'];

    run(projectOptions: ProjectOptions): Promise<void | Targets | string[]> {
        const targets = projectOptions.targets;
        let targetKeys = Object.keys(targets);
        if (projectOptions.logger.isDebug()) {
            targetKeys = targetKeys.filter(targetKey => {
                return targets[targetKey].helpMessage;
            });
        }
        const maxKeyLength = targetKeys.reduce((maxLength, key) => {
            return Math.max(maxLength, key.length);
        }, 0);

        for (const targetKey of targetKeys.sort()) {
            const target: Target = targets[targetKey];
            console.log(
                (targetKey + '                          ').substr(0, maxKeyLength + 1)
                + (target.helpMessage || ''));
        }
        return Promise.resolve();
    }
}
