import {ProjectOptions} from "./ProjectOptions";

export class Logger {
    private projectOptions: ProjectOptions;

    constructor(projectOptions: ProjectOptions) {
        this.projectOptions = projectOptions;
    }

    debug(message?: any, ...optionalParams: any[]): void {
        if (this.isDebug()) {
            console.log(message, ...optionalParams);
        }
    }

    info(message?: any, ...optionalParams: any[]): void {
        if (this.isInfo()) {
            console.log(message, ...optionalParams);
        }
    }

    warn(message?: any, ...optionalParams: any[]): void {
        if (this.isWarn()) {
            console.log(message, ...optionalParams);
        }
    }

    error(message?: any, ...optionalParams: any[]): void {
        if (this.isError()) {
            console.error(message, ...optionalParams);
        }
    }

    public isDebug(): boolean {
        return this.projectOptions.logLevel === 'debug';
    }

    public isInfo(): boolean {
        return this.isDebug() || this.projectOptions.logLevel === 'info';
    }

    public isWarn(): boolean {
        return this.isInfo() || this.projectOptions.logLevel === 'warn';
    }

    public isError(): boolean {
        return this.isWarn() || this.projectOptions.logLevel === 'error';
    }
}
