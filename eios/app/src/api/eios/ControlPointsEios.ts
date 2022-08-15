import {ControlPoints} from "../../models/student/ControlPoints";
import {BaseApiEios} from "./BaseApiEios";

export class ControlPointsEios extends BaseApiEios {
    path = 'controlPoints.json';
    model = ControlPoints;
}