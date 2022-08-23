import {Lib} from "../../models/student/Lib";
import {BaseApiEios} from "./BaseApiEios";

export class LibEios extends BaseApiEios {
    path = 'lib.json'
    model = Lib;
}