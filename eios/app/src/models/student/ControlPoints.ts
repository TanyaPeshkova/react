import {BaseModel} from "../BaseModel";

export interface ControlPointsInterface {
    name_dis: string
    n_sem: number
    mark_name: string
}


export class ControlPoints extends BaseModel implements ControlPointsInterface{
    name_dis: string;
    n_sem: number;
    mark_name: string;

    build(props) {
        this.name_dis = props.NAMEDIS;
        this.n_sem = props.n_sem;
        this.mark_name = props.mark_name;

        return this;
    }
}