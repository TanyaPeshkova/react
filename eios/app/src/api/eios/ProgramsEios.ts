import {Programs} from "../../models/Programs";
import {BaseApiEios} from "./BaseApiEios";

export class ProgramsEios extends BaseApiEios {
    path = 'programs.json';
    model = Programs;
}