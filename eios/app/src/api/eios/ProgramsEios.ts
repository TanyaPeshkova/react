import {Programs} from "../../models/student/Programs";
import {BaseApiEios} from "./BaseApiEios";

export class ProgramsEios extends BaseApiEios {
    path = 'programs.json';
    model = Programs;
}