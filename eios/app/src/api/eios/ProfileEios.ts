import {StudentEios} from "../../models/StudentEios";
import {BaseApiEios} from "./BaseApiEios";

export class ProfileEios extends BaseApiEios {
    path = 'profile.json';
    model = StudentEios;
}