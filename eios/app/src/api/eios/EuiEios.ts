import {Eui} from "../../models/Eui";
import {BaseApiEios} from "./BaseApiEios";

export class EuiEios extends BaseApiEios {
    path = 'eui.json';
    model = Eui;
}