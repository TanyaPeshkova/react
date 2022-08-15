import {BaseModel} from "../BaseModel";

export interface EorInterface {
    code: number
    curriculum: string
    name: string
    link: string
    id: number
    plan: string
}


export class Eor extends BaseModel implements EorInterface{
    code: number;
    curriculum: string;
    name: string;
    link: string;
    id: number;
    plan: string;

    build(props) {
        this.code = props.КодПлана;
        this.curriculum = props.УчебныйПлан;
        this.name = props.name;
        this.link = props.link;
        this.id = props.id;
        this.plan = props.plan;

        return this;
    }
}