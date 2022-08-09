import {BaseModel} from "./BaseModel";

export interface ProgramsInterface {
    RpdId: number
    RpdUrl: string
    lineid: number
    id: string
    name: string
    komps: string
    changes_sheet: string
}


export class Programs extends BaseModel implements ProgramsInterface{
    RpdId: number;
    RpdUrl: string;
    lineid: number;
    id: string;
    name: string;
    komps: string;
    changes_sheet: string;

    build(props: ProgramsInterface) {
        this.RpdId = props.RpdId;
        this.RpdUrl = props.RpdUrl;
        this.lineid = props.lineid;
        this.id = props.id;
        this.name = props.name;
        this.komps = props.komps;
        this.changes_sheet = props.changes_sheet;

        return this;
    }
}