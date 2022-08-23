import {BaseModel} from "../BaseModel";

export interface LibInterface {
    name:string
    img: string
    link:string
}


export class Lib extends BaseModel implements LibInterface{
     name:string;
     img: string;
     link:string;

    build(props) {
        this.name = props.name;
        this.img = props.img;
        this.link = props.link;

        return this;
    }
}