import {Target} from "./Target";
import {Logger} from "./Logger";
import {Component} from "../pango-component";

export type ComponentOrString = string | Component;

export interface ProjectOptions {
    Pango?: any;
    appPath?: string;
    userConfigFileName?: string;
    logger?: Logger;
    projectDir: string;
    requestedTargets?: string[];
    defaultTargets?: string[];
    args?: string[];
    logLevel: string;
    concurrency?: number;
    targets?: { [name: string]: Target; };
    components?: ComponentOrString[];
    loadedComponents?: Component[];
    buildArtifacts?: string[];
    addTarget: (targetName: string, target: Target, sourceComponent?: Component) => Promise<void>;

    [x: string]: any;
}
