import {Target, Targets} from "./Target";
import {ProjectOptions} from "./ProjectOptions";

export class CleanTarget implements Target {
    helpMessage: string = 'deletes build artifacts';

    async run(projectOptions: ProjectOptions): Promise<void | Targets | string[]> {
        if (!projectOptions.buildArtifacts) {
            return;
        }
        for (let buildArtifact of projectOptions.buildArtifacts) {
            projectOptions.logger.info(`deleting ${buildArtifact}`);
            throw new Error('not implemented');
        }
    }
}
