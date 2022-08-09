import {BaseModel} from "./BaseModel";

export interface MarksInterface {
    DISCIPLINE_NAME: string
    mark_name: string
    IS_EXAMEN: number
    NUMBER_OF_SEMESTER: number
}


export class Marks extends BaseModel implements MarksInterface{
    DISCIPLINE_NAME: string;
    mark_name: string;
    IS_EXAMEN: number;
    NUMBER_OF_SEMESTER: number;

    build(props: MarksInterface) {
        this.DISCIPLINE_NAME = props.DISCIPLINE_NAME;
        this.mark_name = props.mark_name;
        this.IS_EXAMEN = props.IS_EXAMEN;
        this.NUMBER_OF_SEMESTER = props.NUMBER_OF_SEMESTER;

        return this;
    }
}