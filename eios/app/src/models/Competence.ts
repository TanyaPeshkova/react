import {BaseModel} from "./BaseModel";

export interface ConpetenceInterface {
    name: string
    id: string
}

// выносим модели в папку student
export class Competence extends BaseModel implements ConpetenceInterface{
    name: string;
    id: string;

    build(props: ConpetenceInterface) {
        this.name = props.name;
        this.id = props.id;

        return this;
    }
}