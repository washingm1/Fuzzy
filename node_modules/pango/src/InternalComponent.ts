import {Component} from "./Component";

export interface InternalComponent extends Component {
    componentPath: string;
}