import {Plan} from "../../models/student/Plan";
import {BaseApiEios} from "./BaseApiEios";

export class PlanEios extends BaseApiEios {
    path = 'plan.json'
    model = Plan;
}