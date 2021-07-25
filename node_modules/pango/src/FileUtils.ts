import * as fs from "fs-extra";

export class FileUtils {
    static isOutputFileOlderThenInputFiles(outputFile: string, inputFiles: string | string[] | Promise<string | string[]>): Promise<boolean> {
        if ((<Promise<string | string[]>>inputFiles).then) {
            return (<Promise<string | string[]>>inputFiles)
                .then(inputFilesResolved => {
                    return FileUtils.isOutputFileOlderThenInputFiles(outputFile, inputFilesResolved);
                });
        }
        return fs.pathExists(outputFile)
            .then(exists => {
                if (!exists) {
                    return true;
                }
                const tasks = [
                    fs.stat(outputFile)
                ];
                if (typeof inputFiles === 'string') {
                    inputFiles = [inputFiles];
                }
                for (const inputFile of <string[]>inputFiles) {
                    tasks.push(fs.stat(inputFile));
                }
                return Promise.all(tasks).then(results => {
                    const outputFileMTime = results[0].mtimeMs;
                    const maxInputFileMTime = results.slice(1).reduce((max, inStat) => {
                        return Math.max(max, inStat.mtimeMs);
                    }, 0);
                    return maxInputFileMTime === 0 ? true : maxInputFileMTime > outputFileMTime;
                });
            });
    }
}