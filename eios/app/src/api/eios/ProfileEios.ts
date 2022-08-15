import {StudentEios} from "../../models/student/StudentEios";
import {BaseApiEios} from "./BaseApiEios";

export class ProfileEios extends BaseApiEios {
    path = 'profile.json';
    model = StudentEios;
}