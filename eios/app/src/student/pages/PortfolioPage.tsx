import React from "react";
import { PortfolioEios } from "../../../api/eios/student/PortfolioEios";
import { withParams } from "../../helpers";
import { Loader } from "../../../comonents/loader";


class PortfolioPage extends React.Component {
    state = {
        portfolio: [],
        filter: {
            text: '',
            category: null
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

        this.setState({ portfolio: portfolio })
    }

    setPortfolio(portfolio) {
        this.setState({
            portfolio: portfolio
        });
    }

    search(e) {
        const { value } = e.target;

        this.setState({
            filter: {
                text: value,
                category: this.state.filter.category,
            }
        });

        if (value.length > 0) {
            const { portfolio } = this.state;
            if (this.state.filter.category !== null) {
                this.setPortfolio(portfolio.map(item => {
                    item.hide = !(item.name.toLowerCase().includes(value.toLowerCase()) && ((item.category === this.state.filter.category)));

                    return item;
                }));
            } else {
                this.setPortfolio(portfolio.map(item => {
                    item.hide = !(item.name.toLowerCase().includes(value.toLowerCase()));

                    return item;
                }));
            }
        } else {
            this.resetFilter();
        }
    }

    resetFilter() {
        const { portfolio } = this.state;

        this.setPortfolio(portfolio.map(item => {
            item.hide = false;

            return item;
        }));
    }

    generalFilter(field, val) {
        const { portfolio } = this.state;
        let text = this.state.filter.text;

        this.setPortfolio(portfolio.map(item => {
            item.hide = !((item[field] === val) && item.name.toLowerCase().includes(this.state.filter.text.toLowerCase()));

            this.setState({
                filter: {
                    category: val,
                    text: text,
                }
            });

            return item;
        }));
    }

    categoryFilter(val: number) {
        this.generalFilter('category', val);
    }

    handleCategoryFilter(e) {
        const { value } = e.target;

        switch (value) {
            case '1':
                this.categoryFilter(1)
                break;
            case '2':
                this.categoryFilter(2)
                break;
            case '3':
                this.categoryFilter(3)
                break;
            case '4':
                this.categoryFilter(4)
                break;
            case '5':
                this.categoryFilter(5)
                break;
            case '6':
                this.categoryFilter(6)
                break;
            case '7':
                this.categoryFilter(7)
                break;
            case '8':
                this.categoryFilter(8)
                break;
            case '9':
                this.categoryFilter(9)
                break;
            default:
                this.resetFilter();
                break;
        }
    }


    render() {
        const { portfolio } = this.state;
        const template = portfolio.length === 0 ? <Loader /> :
            <TableComponent elements={this.state.portfolio} />

        return <div className="portfolio">
            <HeaderComponent />
            <div className="attachments ">
                <FilterComponent
                    app_state={this.state}
                    onSearch={this.search}
                    onCategoryFilter={this.handleCategoryFilter} /></div>
            {template}</div>
    }
}

class HeaderComponent extends React.Component {
    render() {
        return <>
            <h3 className="mb-5 mt-5">Учебная деятельность</h3>
            <a href="/portfolio/portfolio/edit/" target="_blank" className="btn btn-sm btn-tspu text-white mb-3">Редактировать
                портфолио <i className="fa fa-link"></i></a></>
    }
}

interface ProfileInterface {
    name: string;
    category: number;
    url: string;
    description: string;
    score: string;
    hide?: boolean
}

interface TableProps {
    elements: ProfileInterface[]
}

class TableComponent extends React.Component<TableProps> {
    render() {
        const { elements } = this.props;
        const rows = elements.map((item, indx) => {
            return item.hide ? null : <tr key={indx}>
                <td><a target="_blank" href={item.url}>{item.name}</a>
                </td>
                <td>{item.description}</td>
                <td>{item.score}</td>
            </tr>
        });
        return <table className="table">
            <thead>
                <tr>
                    <th>Работы обучающегося</th>
                    <th>Описание</th>
                    <th>Результат</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody></table>
    }
}

interface FilterInterface {
    onSearch;
    onCategoryFilter;
    app_state;
}

class FilterComponent extends React.Component<FilterInterface> {

    render() {
        const { onSearch, onCategoryFilter, app_state } = this.props;

        return <div className={'row mb-3'}>
            <div className="col-6">
                <input autoFocus onChange={onSearch}
                    className={'form-control'}
                    value={app_state.filter.text}
                    type="text"
                    placeholder="Дисциплина" />
            </div>
            <div className="col-3">
                <select onChange={onCategoryFilter} className={'form-control'}>
                    <option value=''>Все</option>
                    <option value='1'>Учебная деятельность</option>
                    <option value='2'>Научно-исследовательская деятельность</option>
                    <option value='3'>Достижения в профессиональной сфере</option>
                    <option value='4'>Общественная деятельность</option>
                    <option value='5'>Культурно-творческая деятельность</option>
                    <option value='6'>Спортивная деятельность</option>
                    <option value='7'>Рецензии и оценки</option>
                    <option value='8'>Академическая стипендия по общественной деятельности</option>
                    <option value='9'>Скан зачетка/справки о назначении стипендии</option>
                </select>
            </div>
        </div>;
    }
}

export default withParams(PortfolioPage);