import { Student } from "./Student";

export class StudentEios extends Student  {

    gender: number;
    profiles: string;
    special: string;
    faculty: string;
    email: string;
    form: string;

    build(props) {
        super.build(props)
        this.gender = props.gender;
        this.profiles = props.profiles;
        this.special = props.special;
        this.faculty = props.faculty;
        this.email = props.email;
        this.form = props.form;

        return this
    }

}