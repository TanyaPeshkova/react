import {BaseModel} from "../BaseModel";
import {PortfolioCategory} from "./portfolio/Category";

export interface PortfolioInterface {
    name: string
    category_id: number;
    url: string
    description?: string
    score?: string
}


export class Portfolio extends BaseModel implements PortfolioInterface {
    name: string;
    category: PortfolioCategory;
    category_id: number;
    url: string;
    description: string;
    score: string;
    hide: boolean = false;

    build(props) {
        this.name = props.name;
        this.category_id = props.category;
        this.category = new PortfolioCategory().build(props.category);

        this.url = props.url;
        this.description = props.description;
        this.score = props.score;

        return this;
    }
}