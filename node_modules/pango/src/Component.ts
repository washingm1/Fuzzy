import {Targets} from "./Target";
import {ProjectOptions} from "./ProjectOptions";

type getTargets = (projectOptions: ProjectOptions) => Promise<Targets>;

export interface Component {
    targets?: Targets | getTargets;
}
