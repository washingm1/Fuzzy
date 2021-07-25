import {SpawnOptions} from "child_process";
import * as childProcess from "child-process-promise";
import {ProjectOptions} from "./index";

const spawn = childProcess.spawn;

export class Shell {
    static shell(projectOptions: ProjectOptions, cmd: string[], options?: SpawnOptions): Promise<void> {
        const promise = spawn(cmd[0], cmd.slice(1));
        const childProcess = promise.childProcess;
        childProcess.stdout.on('data', function (data) {
            let lines = data.toString().trim().split('\n');
            for (const line of lines) {
                projectOptions.logger.info(line);
            }
        });
        childProcess.stderr.on('data', function (data) {
            let lines = data.toString().trim().split('\n');
            for (const line of lines) {
                projectOptions.logger.error(line);
            }
        });
        return promise;
    }

}