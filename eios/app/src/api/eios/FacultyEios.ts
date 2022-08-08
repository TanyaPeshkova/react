import {BaseApiEios} from "./BaseApiEios";
import {Student} from "../../models/Student";
import {Faculty} from "../../models/Faculty";

export class FacultyEios extends BaseApiEios {
    path = '/api/faculties/';
    model = Faculty;
}