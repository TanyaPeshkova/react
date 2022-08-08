import {Student} from "../../models/Student";
import {BaseApiEios} from "./BaseApiEios";

export class StudentEios extends BaseApiEios {
    path = '/api/students/'
    model = Student;
}