import React from "react";
import {PortfolioEios} from "../../api/eios/PortfolioEios";
import {withParams} from "../../helpers";
import {Loader} from "../../../comonents/loader";
import {
    portfolioCategoryDict,
    PortfolioCategoryInterface
} from "../../models/student/portfolio/Category";


class PortfolioPage extends React.Component {
    state = {
        portfolio: [],
        filter: {
            text: '',
            category_id: null
        }
    }

    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.handleCategoryFilter = this.handleCategoryFilter.bind(this);
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const portfolio = await new PortfolioEios().all();

        this.setPortfolio(portfolio)
    }

    setPortfolio(portfolio) {
        this.setState({
            portfolio: portfolio
        });
    }

    search(e) {
        const {value} = e.target;

        this.setState({
            filter: {
                text: value,
                category_id: this.state.filter.category_id,
            }
        });

        const {category_id} = this.state.filter;

        if (value.length > 0) {
            const {portfolio} = this.state;
            const query = value.toLowerCase();

            if (category_id !== null) {
                this.setPortfolio(portfolio.map(item => {
                    item.hide = !(item.name.toLowerCase().includes(query) && ((item.category_id === category_id)));

                    return item;
                }));
            } else {
                this.setPortfolio(portfolio.map(item => {
                    item.hide = !(item.name.toLowerCase().includes(query));

                    return item;
                }));
            }
        } else {
            this.resetFilter();
        }
    }

    resetFilter() {
        const {portfolio} = this.state;

        this.setState({
            filter: {
                text: '',
                category_id: null,
            }
        })

        this.setPortfolio(portfolio.map(item => {
            item.hide = false;

            return item;
        }));
    }

    generalFilter(field, val) {
        const {portfolio} = this.state;
        const {filter} = this.state;
        let {text} = filter;

        this.setPortfolio(portfolio.map(item => {
            item.hide = !((item[field] === val) && item.name.toLowerCase().includes(text.toLowerCase()));

            this.setState({
                filter: {
                    category_id: val,
                    text: text,
                }
            });

            return item;
        }));
    }

    handleCategoryFilter(e) {
        const {value} = e.target;
        if (value) {
            this.generalFilter('category_id', +value);
        } else {
            this.resetFilter();
        }
    }

    render() {
        const {portfolio} = this.state;
        const template = portfolio.length ? <TableComponent elements={this.state.portfolio}/> : <Loader/>;
        const categories = portfolioCategoryDict.toArray();

        return <div className="portfolio">
            <HeaderComponent/>
            <div className="attachments">
                <FilterComponent
                    categories={categories}
                    app_state={this.state}
                    onSearch={this.search}
                    onCategoryFilter={this.handleCategoryFilter}/>
            </div>
            <div className={'table-responsive'}>
                {template}
            </div>
        </div>
    }
}

class HeaderComponent extends React.Component {
    render() {
        return <>
            <h3 className="mb-3">Учебная деятельность</h3>
            <a href="/portfolio/portfolio/edit/" target="_blank" className="btn btn-sm btn-tspu text-white mb-3">Редактировать
                портфолио <i className="fa fa-link"></i></a></>
    }
}

interface PortfolioInterface {
    name: string;
    category: PortfolioCategoryInterface;
    url: string;
    description?: string;
    score?: string;
    hide?: boolean;
}

interface TableProps {
    elements: PortfolioInterface[];
}

class TableComponent extends React.Component<TableProps> {
    render() {
        const {elements} = this.props;
        const rows = elements.map((item, indx) => {
            return item.hide ? null : <tr key={indx}>
                <td>{indx + 1}</td>
                <td>
                    <a target="_blank" href={`//portfolio.tspu.edu.ru/${item.url}`}>{item.name}</a>
                </td>
                <td>{item.description}</td>
                <td>{item.score}</td>
                <td>{item.category.name}</td>
            </tr>
        });
        return <table className="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Работа</th>
                <th>Описание</th>
                <th>Результат</th>
                <th>Категория</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    }
}

interface FilterInterface {
    onSearch;
    onCategoryFilter;
    app_state;
    categories;
}

class FilterComponent extends React.Component<FilterInterface> {

    render() {
        const {onSearch, onCategoryFilter, app_state, categories} = this.props;

        return <div className={'row mb-3'}>
            <div className="col-6">
                <input autoFocus onChange={onSearch}
                       className={'form-control'}
                       value={app_state.filter.text}
                       type="text"
                       placeholder="Поиск"/>
            </div>
            <div className="col-6">
                <select onChange={onCategoryFilter} className={'form-control'}>
                    <option value=''>Категория</option>
                    {categories.map((category, ind) => {
                        return <option key={ind} value={category[0]}>{category[1]}</option>
                    })}
                </select>
            </div>
        </div>;
    }
}

export default withParams(PortfolioPage);