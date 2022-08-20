import React from 'react';

import { ProgramsEios } from "../../api/eios/ProgramsEios";

class ProgramsPage extends React.Component {
    state = {
        programs: [],
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const programs = await new ProgramsEios().all();

        this.setState({ programs: programs })

    }



    search(query) {
        let newList = this.state.programs;

        if (query.length > 0) {
            newList = newList.map(item => {
                item.hide = (!item.name.toLowerCase().includes(query.toLowerCase())) && (!item.id.toLowerCase().includes(query.toLowerCase()));

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
        const rows = this.state.programs.map((program, indx) => {
            return program.hide ? '' : <tr key={indx}>
                <td >
                    {program.id}
                </td>
                <td>
                    <a href={program.rpdUrl} target="_blank">{program.name}</a>
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
                                placeholder="Поиск..." ></input></th>

                        </tr>
                        <tr>
                            <th>Код</th>
                            <th>Дисциплина/практика (с приложением ОММ/ФОС)</th>

                        </tr>
                    </thead>
                    <tbody>{rows}</tbody></table></div></div>
    }

}


export default ProgramsPage;