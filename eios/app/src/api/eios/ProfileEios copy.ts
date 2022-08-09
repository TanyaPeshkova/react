import {Eor} from "../../models/Eor";
import {BaseApiEios} from "./BaseApiEios";

export class ProfileEios extends BaseApiEios {
    path = 'eor.json';
    model = Eor;
}