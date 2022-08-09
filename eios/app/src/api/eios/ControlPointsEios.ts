import {ControlPoints} from "../../models/ControlPoints";
import {BaseApiEios} from "./BaseApiEios";

export class ControlPointsEios extends BaseApiEios {
    path = 'controlPoints.json';
    model = ControlPoints;
}