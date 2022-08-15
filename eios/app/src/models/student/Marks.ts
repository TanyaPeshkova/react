import {BaseModel} from "../BaseModel";

export interface MarksInterface {
    discipline_name: string
    mark_name: string
    is_examen: number
    number_of_semester: number
}


export class Marks extends BaseModel implements MarksInterface{
    discipline_name: string;
    mark_name: string;
    is_examen: number;
    number_of_semester: number;

    build(props) {
        this.discipline_name = props.DISCIPLINE_NAME;
        this.mark_name = props.mark_name;
        this.is_examen = props.IS_EXAMEN;
        this.number_of_semester = props.NUMBER_OF_SEMESTER;

        return this;
    }
}