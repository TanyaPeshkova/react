import {BaseModel} from "./BaseModel";

export interface ControlPointsInterface {
    NAMEDIS: string // переименовать в нижний регистр
    n_sem: number
    mark_name: string
}


export class ControlPoints extends BaseModel implements ControlPointsInterface{
    NAMEDIS: string;
    n_sem: number;
    mark_name: string;

    build(props: ControlPointsInterface) {
        this.NAMEDIS = props.NAMEDIS;
        this.n_sem = props.n_sem;
        this.mark_name = props.mark_name;

        return this;
    }
}