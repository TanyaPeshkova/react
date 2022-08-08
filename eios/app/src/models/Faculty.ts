import {BaseModel} from "./BaseModel";

export interface FacultyInterface {
    id: number
    name: string
    shortname: string
}

export class Faculty extends BaseModel implements FacultyInterface {
    id: number;
    name: string;
    shortname: string;

    build(props: FacultyInterface) {
        this.id = props.id;
        this.name = props.name;
        this.shortname = props.shortname;

        return this;
    };
}