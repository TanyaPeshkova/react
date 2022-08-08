import {BaseModel} from "./BaseModel";

export interface GroupInterface {
    id: number
    course: number
    edu_level: string
    faculty_id: number
    group_type: string
    number: string
}


export class Group extends BaseModel implements GroupInterface{
    id: number;
    course: number;
    edu_level: string;
    faculty_id: number;
    group_type: string;
    number: string;

    build(props: GroupInterface) {
        this.id = props.id;
        this.course = props.course;
        this.edu_level = props.edu_level;
        this.faculty_id = props.faculty_id;
        this.group_type = props.group_type;
        this.number = props.number;

        return this;
    }
}