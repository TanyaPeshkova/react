import {Competence} from "../../models/student/Competence";
import {BaseApiEios} from "./BaseApiEios";

export class CompetenceEios extends BaseApiEios {
    path = 'compotence.json';
    model = Competence;
}