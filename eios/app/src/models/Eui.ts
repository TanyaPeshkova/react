import {BaseModel} from "./BaseModel";

export interface EuiInterface {
    authors: number
    publishing: string
    name: string
    link: string
    id: number
}


export class Eui extends BaseModel implements EuiInterface{
    authors: number;
    publishing: string;
    name: string;
    link: string;
    id: number;

    build(props: EuiInterface) {
        this.authors = props.authors;
        this.publishing = props.publishing;
        this.name = props.name;
        this.link = props.link;
        this.id = props.id;

        return this;
    }
}