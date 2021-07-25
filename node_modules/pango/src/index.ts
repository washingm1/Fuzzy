import {ProjectOptions} from "./ProjectOptions";
import {Pango} from "./Pango";
import {Targets} from "./Target";

export async function run(projectOptions: ProjectOptions): Promise<void> {
    projectOptions.Pango = projectOptions.Pango || Pango;
    const pango: Pango = new projectOptions.Pango();
    await pango.run(projectOptions);
}

export {ProjectOptions} from "./ProjectOptions";
export {Pango} from "./Pango";
export {Target, Targets} from "./Target";
export {FileUtils} from "./FileUtils";
export {HelpTarget} from "./HelpTarget";
export {CleanTarget} from "./CleanTarget";
export {Shell} from "./Shell";
