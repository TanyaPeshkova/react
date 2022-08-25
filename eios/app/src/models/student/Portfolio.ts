import {BaseModel} from "../BaseModel";

export interface PortfolioInterface {
    name: string
    category: number
    url: string
    description: string
    score: string
}


export class Portfolio extends BaseModel implements PortfolioInterface{
    name: string;
    category: number;
    url: string;
    description: string;
    score: string;

    build(props) {
        this.name = props.name;
        this.category = props.category;
        this.url = props.url;
        this.description = props.description;
        this.score = props.score;

        return this;
    }
}