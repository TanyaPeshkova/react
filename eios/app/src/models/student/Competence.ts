import {BaseModel} from "../BaseModel";

export interface ConpetenceInterface {
    name: string
    id: string
}


export class Competence extends BaseModel implements ConpetenceInterface{
    name: string;
    id: string;

    build(props: ConpetenceInterface) {
        this.name = props.name;
        this.id = props.id;

        return this;
    }
}