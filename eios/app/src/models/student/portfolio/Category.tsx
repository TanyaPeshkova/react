import {BaseModel} from "../../BaseModel";

export const portfolioCategoryDict = {
    1: 'Учебная деятельность',
    2: 'Научно-исследовательская деятельность',
    3: 'Достижения в профессиональной сфере',
    4: 'Общественная деятельность',
    5: 'Культурно-творческая деятельность',
    6: 'Спортивная деятельность',
    7: 'Рецензии и оценки',
    8: 'Академическая стипендия по общественной деятельности',
    9: 'Скан зачетка/справки о назначении стипендии',

    getById: function (pk) {
        return this[+pk] ? this[+pk] : null;
    },

    toArray: function () {
        const items = Object.keys(this).map((key) => {
            if (typeof this[key] === 'string') {
                return [Number(key), this[key]];
            }
        });

        return items.filter((item) => {
            return item && typeof item[1] === 'string';
        });
    },
}

export interface PortfolioCategoryInterface {
    id: number;
    name: string;
}

export class PortfolioCategory extends BaseModel implements PortfolioCategoryInterface {
    id: number;
    name: string;

    build(id): this {
        this.id = id;
        this.name = portfolioCategoryDict.getById(this.id);

        return this;
    }
}