import React from 'react';

import { CompetenceEios } from "../../../api/eios/student/CompetenceEios";
import { withParams } from "../../helpers";
import { Competence } from "../../models/student/Competence";
import { Loader } from "../../../comonents/loader";


class CompetencePage extends React.Component {
    state = {
        competence: []
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const competence = await new CompetenceEios().all();

        this.setState({ competence: competence })
    }

    search(query) {
        let newList = this.state.competence;

        if (query.length > 0) {
            newList = newList.map(item => {
                item.hide = (!item.name.toLowerCase().includes(query.toLowerCase()));

                return item;
            });
        } else {
            newList = newList.map(item => {
                item.hide = false;
                return item;
            });
        }

        this.setState({
            eor: newList
        });
    }

    render() {
        const { competence } = this.state
        const template = competence.length === 0 ?
            <Loader /> :
            <TableComponent elements={this.state.competence} />

        return <div className="container-md container-fluid mt-5 pe-2 ps-2 pe-md-1 ps-md-1">
            <div className="students-competence">
                <HeaderComponent />
                <FilterComponent />
                {template}
            </div>
        </div>
    }
}

class HeaderComponent extends React.Component {
    render() {
        return <div className="h3 mb-5">
            Результаты освоения программы
        </div>
    }
}

class FilterComponent extends React.Component {
    render() {
        return <div className="h5 mb-3">
            <button className="btn btn-sm btn-tspu show_all">Все</button>
            <button className="btn btn-sm btn-tspu komp-switch" title="Общекультурные компетенции"
                data-x=".komp-uk">УК
            </button>
            <button className="btn btn-sm btn-tspu komp-switch" title="Общекультурные компетенции"
                data-x=".komp-opk">ОПК
            </button>
            <button className="btn btn-sm btn-tspu komp-switch" title="Общекультурные компетенции"
                data-x=".komp-pk">ПК
            </button>

        </div>
    }
}

interface TableProps {
    elements: Competence[]
}

class TableComponent extends React.Component<TableProps> {
    render() {
        const { elements } = this.props
        const rows = elements.map((comp, indx) => {
            return <th className="komp komp-uk"
                data-toggle="tooltip"
                title={comp.name} key={indx}>{comp.id}</th>
        });
        return <table className="table table-bordered komps-table ">
            <thead>
                <td>
                    <th>Дисциплина</th>
                    {rows}
                </td>
            </thead>
            <tbody></tbody>
        </table>
    }
}

export default withParams(CompetencePage);