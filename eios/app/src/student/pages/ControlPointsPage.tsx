import React from 'react';

import {ControlPointsEios} from '../../../api/eios/student/ControlPointsEios';
import {withParams} from "../../helpers";
import {Loader} from "../../../components/loader";

class ControlPointsPage extends React.Component {
    state = {
        controlPoints: [],
        filter: {
            name: '',
            score: ''
        }
    }

    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
        this.handlePointFilter = this.handlePointFilter.bind(this);
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const controlPoints = await new ControlPointsEios().all();

        this.setState({controlPoints: controlPoints})
    }


    setControlPoints(points) {
        this.setState({
            controlPoints: points
        });
    }

    search(e) {
        const {value} = e.target;

        this.setState({
            filter: {
                name: value,
                score: this.state.filter.score
            }
        });

        if (value.length > 1) {
            const {controlPoints} = this.state;
            if ((this.state.filter.score !== '')) {
                this.setControlPoints(controlPoints.map(point => {
                    point.hide = !(point.name_dis.toLowerCase().includes(value.toLowerCase()) && ((point.mark_name === this.state.filter.score)));

                    return point;
                }));
            } else {
                this.setControlPoints(controlPoints.map(point => {
                    point.hide = !(point.name_dis.toLowerCase().includes(value.toLowerCase()));
                    return point;
                }));
            }
        } else {
            this.resetFilter();
        }
    }

    handlePointFilter(e) {
        const {value} = e.target;

        switch (value) {
            case 'excellent':
                this.pointFilter('отлично');
                break;
            case 'good':
                this.pointFilter('хорошо');
                break;
            case 'well':
                this.pointFilter('удовлетворительно');
                break;
            case 'fail':
                this.pointFilter('неудовлетворительно');
                break;
            default:
                this.resetFilter();
                break;
        }
    }

    generalFilter(field, val) {
        const {controlPoints} = this.state;
        this.resetFilterValue();

        this.setControlPoints(controlPoints.map(point => {
            point.hide = !((point[field] === val) && point.name_dis.toLowerCase().includes(this.state.filter.name.toLowerCase()));
            this.setState({
                filter: {
                    score: val,
                    name: this.state.filter.name,
                }
            })
            return point;
        }));
    }

    pointFilter(val: string) {
        this.generalFilter('mark_name', val);
    }

    resetFilterValue() {
        this.setState({
            filter: {
                name: ''
            }
        });
    }

    resetFilter() {
        const {controlPoints} = this.state;
        this.setControlPoints(controlPoints.map(point => {
            point.hide = false;
            return point;
        }));
    }

    render() {
        const {controlPoints} = this.state;

        return <div className="students-kt">
            <div className="mb-3">
                <HeaderComponent/>
            </div>

            <div className={'mb-3'}>
                <FilterComponent
                    app_state={this.state}
                    onSearch={this.search}
                    onPointFilter={this.handlePointFilter}/>
            </div>

            <div className={'mb-3'}>
                {controlPoints.length ? <TableComponent elements={this.state.controlPoints}/> : <Loader/>}
            </div>
        </div>;
    }
}


interface ControlPointInteface {
    name_dis: string
    n_sem: number
    mark_name: string
    hide?: boolean;
}

interface TableProps {
    elements: ControlPointInteface[]
}

class TableComponent extends React.Component<TableProps> {
    render() {
        const {elements} = this.props;

        const rows = elements.map((point, indx) => {
            const mark = point.mark_name !== "" ? point.mark_name : 'не выбрано';
            return point.hide ? null :
                <tr key={indx}>
                    <td>{point.name_dis}</td>
                    <td>{point.n_sem}</td>
                    <td>{mark}</td>
                </tr>;
        });

        return <table className="table">
            <thead>
            <tr>
                <th>Дисциплина</th>
                <th>Семестр</th>
                <th>Результат</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>;
    }
}

class HeaderComponent extends React.Component {
    render() {
        return <>
            <h3 className="">
                Ход образовательного процесса
            </h3>
            <h5 className="mb-3">
                Текущий контроль успеваемости обучающегося (результаты контрольных точек)
            </h5>
            <div>
                <a className="btn btn-sm btn-tspu mb-4" href="/students/kt/file_export">
                    Скачать данные в Excel-файл</a>
            </div>
        </>
    }
}

interface FilterInterface {
    onSearch;
    onPointFilter;
    app_state;
}

class FilterComponent extends React.Component<FilterInterface> {
    render() {
        const {onSearch, onPointFilter, app_state} = this.props;

        return <div className={'row'}>
            <div className="col-6">
                <input autoFocus onChange={onSearch} className={'form-control'} value={app_state.filter.text}
                       type="text"
                       placeholder="Дисциплина"/>
            </div>
            <div className="col-6">
                <select className={'form-control'} onChange={onPointFilter}>
                    <option value=''>Все</option>
                    <option value='excellent'>Отлично</option>
                    <option value='good'>Хорошо</option>
                    <option value='well'>Удовлетворительно</option>
                    <option value='fail'>Неудовлетворительно</option>
                </select>
            </div>
        </div>;
    }
}

export default withParams(ControlPointsPage);
