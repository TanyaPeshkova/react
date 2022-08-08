import {BaseApiEios} from "./BaseApiEios";
import {Group} from "../../models/Group";

export class GroupEios extends BaseApiEios {
    path = '/api/groups/';
    model = Group;
}