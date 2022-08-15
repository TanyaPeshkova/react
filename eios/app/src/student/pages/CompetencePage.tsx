import React from 'react';
import { Link } from 'react-router-dom';

import { Competence } from "../../models/student/Competence";
import { CompetenceEios } from '../../api/eios/CompetenceEios';

class CompetencePage extends React.Component {
    state = {
        competence: [new Competence()],
        filtered: []
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const competence = await new CompetenceEios().all();

        this.setState({ competence: competence })
        this.setState({ filtered: competence })
    }


    search = search => {
        let current = [];
        let newList = [];

        if (search !== '') {
            current = this.state.competence
            newList = current.filter(point => {
                const lc = point.NAMEDIS.toLowerCase();
                const filter = search.toLowerCase();
                return lc.includes(filter)
            })
        } else {
            newList = this.state.competence;
        }

        this.setState({
            filtered: newList
        })
    }

    render() {

        const rows = this.state.filtered.map((comp, indx) => {
            return <th className="komp komp-uk"
                data-toggle="tooltip"
                title={comp.name}>{comp.id}</th>
        })


        return <div className="container-md container-fluid mt-5 pe-2 ps-2 pe-md-1 ps-md-1">
            <div className="students-competence">
                <div className="h3 mb-5">
                    Результаты освоения программы
                </div>


                <div className="h5 mb-3">
                    <button className="btn btn-sm btn-tspu show_all">Все</button>
                    <button className="btn btn-sm btn-tspu komp-switch" title="Общекультурные компетенции"
                        data-x=".komp-uk">УК</button>

                    <button className="btn btn-sm btn-tspu komp-switch" title="Общекультурные компетенции"
                        data-x=".komp-opk">ОПК</button>
                    <button className="btn btn-sm btn-tspu komp-switch" title="Общекультурные компетенции"
                        data-x=".komp-pk">ПК</button>
                </div>
                <table className="table table-bordered komps-table">
                    <thead>
                        <tr>
                            <th>Дисциплина</th>
                            {rows}
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    }

}

export default CompetencePage;