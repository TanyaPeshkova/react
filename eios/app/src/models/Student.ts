import {BaseModel} from "./BaseModel";

export interface StudentInterface {
    id: number
    fullname: string
    firstname: string
    secondname: string
    lastname: string
    course: number
    faculty_id: number
    group_number: string
    special_code: string
    group_id: number
    student_type: string
    edu_level: string
}


export class Student extends BaseModel implements StudentInterface {
    course: number;
    edu_level: string;
    faculty_id: number;
    firstname: string;
    fullname: string;
    group_id: number;
    group_number: string;
    id: number;
    lastname: string;
    secondname: string;
    special_code: string;
    student_type: string;

    build(props) {
        this.id = props.id;
        this.fullname = props.fullname;
        this.firstname = props.firstname;
        this.secondname = props.secondname;
        this.lastname = props.lastname;
        this.course = props.course;
        this.faculty_id = props.faculty_id;
        this.group_number = props.group_number;
        this.special_code = props.special_code;
        this.group_id = props.group_id;
        this.student_type = props.student_type;
        this.group_id = props.edu_level;

        return this;
    }
}