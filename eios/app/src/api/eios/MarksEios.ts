import {Marks} from "../../models/Marks";
import {BaseApiEios} from "./BaseApiEios";

export class MarksEios extends BaseApiEios {
    path = 'marks.json'
    model = Marks;
}