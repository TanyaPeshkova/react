import {BaseModel} from "../BaseModel";

export interface ProgramsInterface {
    rpdId: number
    rpdUrl: string
    lineid: number
    id: string
    name: string
    komps: string
    changes_sheet: string
}


export class Programs extends BaseModel implements ProgramsInterface{
    rpdId: number;
    rpdUrl: string;
    lineid: number;
    id: string;
    name: string;
    komps: string;
    changes_sheet: string;

    build(props) {
        this.rpdId = props.RpdId;
        this.rpdUrl = props.RpdUrl;
        this.lineid = props.lineid;
        this.id = props.id;
        this.name = props.name;
        this.komps = props.komps;
        this.changes_sheet = props.changes_sheet;

        return this;
    }
}