import {Competence} from "../../models/Competence";
import {BaseApiEios} from "./BaseApiEios";

export class CompetenceEios extends BaseApiEios {
    path = 'compotence.json';
    model = Competence;
}