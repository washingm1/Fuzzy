import {ProjectOptions} from "./ProjectOptions";

type preRequisitesFn = (projectOptions: ProjectOptions) => Promise<void | Targets>;
type postRequisitesFn = (projectOptions: ProjectOptions) => Promise<void | Targets>;

export interface Target {
    helpMessage?: string;

    run?(projectOptions: ProjectOptions): Promise<void | Targets | string[]>;

    preRequisites?: preRequisitesFn | string[];

    postRequisites?: postRequisitesFn | string[];
}

export type Targets = { [name: string]: Target };
