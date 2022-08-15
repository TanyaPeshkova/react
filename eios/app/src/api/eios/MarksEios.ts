import {Marks} from "../../models/student/Marks";
import {BaseApiEios} from "./BaseApiEios";

export class MarksEios extends BaseApiEios {
    path = 'marks.json'
    model = Marks;
}