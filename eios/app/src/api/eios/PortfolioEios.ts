import {Portfolio} from "../../models/student/Portfolio";
import {BaseApiEios} from "./BaseApiEios";

export class PortfolioEios extends BaseApiEios {
    path = 'portfolio.json';
    model = Portfolio;
}