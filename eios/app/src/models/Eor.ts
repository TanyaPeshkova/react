import {BaseModel} from "./BaseModel";

export interface EorInterface {
    КодПлана: number // переименовать на латиницу
    УчебныйПлан: string // переименовать на латиницу
    name: string
    link: string
    id: number
    plan: string
}


export class Eor extends BaseModel implements EorInterface{
    КодПлана: number;
    УчебныйПлан: string;
    name: string;
    link: string;
    id: number;
    plan: string;

    build(props: EorInterface) {
        this.КодПлана = props.КодПлана;
        this.УчебныйПлан = props.УчебныйПлан;
        this.name = props.name;
        this.link = props.link;
        this.id = props.id;
        this.plan = props.plan;

        return this;
    }
}