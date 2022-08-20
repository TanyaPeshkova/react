import React from 'react';

import { CompetenceEios } from '../../api/eios/CompetenceEios';

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

        const rows = this.state.competence.map((comp, indx) => {
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
                    <thead><td>
                        <th>Дисциплина</th>
                        {rows}
                    </td>
                    </thead><tbody></tbody></table></div></div>
    }

}

export default CompetencePage;