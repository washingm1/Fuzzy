import {Target} from "./Target";
import {InternalComponent} from "./InternalComponent";

export interface InternalTarget extends Target {
    name?: string;
    sourceComponent?: InternalComponent;
}