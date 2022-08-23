import {BaseModel} from "../BaseModel";

export interface PlanInterface {
    groups:string
    groups_ousk: string
    plan_id:number
    speciality_id:number
    speciality_code:string
    speciality_name:string
    education_level_id:number
    op_full_name:string
    op_id:number
    plan_server_id:number
    url:string
    url_kug:string
    op_actual:number
    up_actual:number
    up_public:number
}


export class Plan extends BaseModel implements PlanInterface{
    groups:string;
    groups_ousk: string;
    plan_id:number;
    speciality_id:number;
    speciality_code:string;
    speciality_name:string;
    education_level_id:number;
    op_full_name:string;
    op_id:number;
    plan_server_id:number;
    url:string;
    url_kug:string;
    op_actual:number;
    up_actual:number;
    up_public:number;

    build(props) {
        this.groups = props.groups;
        this.groups_ousk = props.groupsOUSK;
        this.plan_id = props.link;
        this.speciality_id = props.Speciality_id;
        this.speciality_name = props.Speciality_name;
        this.speciality_code = props.Speciality_code;
        this.education_level_id = props.education_level_id;
        this.op_full_name = props.op_full_name;
        this.op_id = props.OP_id;
        this.plan_server_id = props.plan_server_id;
        this.url = props.url;
        this.url_kug = props.url_KUG;
        this.op_actual = props.OP_actual;
        this.up_actual = props.UP_actual;
        this.up_public = props.UP_public;

        return this;
    }
}