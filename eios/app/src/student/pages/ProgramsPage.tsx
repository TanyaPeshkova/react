import React from 'react';
import {Link} from 'react-router-dom'


import {Programs} from "../../models/Programs";
import {ProgramsEios} from "../../api/eios/ProgramsEios";

class ProgramsPage extends React.Component {
    state = {
        programs: [new Programs()],
        filtered: []
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const programs = await new ProgramsEios().all();

        this.setState({programs: programs})
        this.setState({filtered: programs})
    }


    search = search => {
        let current = [];
        let newList = [];

        if (search !== '') {
            current = this.state.programs
            newList = current.filter(program => {
                const lc = program.name.toLowerCase();
                const filter = search.toLowerCase();
                return lc.includes(filter)
            })
        } else {
            newList = this.state.programs;
        }

        this.setState({
            filtered: newList
        })
    }

    render() {
        const rows = this.state.filtered.map((program, indx) => {
            return <tr key={indx}>
                <td>
                    {program.id}
                </td>
                <td>
                    <a href={program.RpdUrl} target="_blank">{program.name}</a>
                </td>
            </tr>
        })
        return <div className="container-md container-fluid mt-5 pe-2 ps-2 pe-md-1 ps-md-1">

            <div className="students-docs">
                <div className="h3 mt-5 pt-5 mb-3">
                    Рабочие программы учебных дисциплин, практик
                </div>

                <table className="table ">
                    <thead>
                    <tr>
                        <th></th>
                        <th><input onChange={e => this.search(e.target.value)}
                                   type="text"
                                   placeholder="Поиск..."></input></th>

                    </tr>
                    <tr>
                        <th>Код</th>
                        <th>Дисциплина/практика (с приложением ОММ/ФОС)</th>

                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        </div>
    }

}


export default ProgramsPage;