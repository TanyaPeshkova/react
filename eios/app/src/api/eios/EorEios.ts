import {Eor} from "../../models/Eor";
import {BaseApiEios} from "./BaseApiEios";

export class EorEios extends BaseApiEios {
    path = 'eor.json';
    model = Eor;
}