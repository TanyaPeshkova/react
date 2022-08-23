import React from 'react';
import { ProgramsEios } from "../../../api/eios/student/ProgramsEios";
import { withParams } from "../../helpers";
import { Loader } from "../../../components/loader";

class ProgramsPage extends React.Component {
    state = {
        programs: [],
    }

    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const programs = await new ProgramsEios().all();

        this.setState({ programs: programs });
    }

    search(e) {
        const { value } = e.target;

        let newList = this.state.programs;

        if (value.length > 0) {
            newList = newList.map(item => {
                item.hide = (!item.name.toLowerCase().includes(value.toLowerCase())) && (!item.id.toLowerCase().includes(value.toLowerCase()));
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
            return program.hide ? null :
                <tr key={indx}>
                    <td>{program.id}</td>
                    <td><a href={program.rpdUrl} target="_blank">{program.name}</a></td>
                    <td>
                        {program.changes_sheet ? <a className="btn btn-sm btn-tspu text-white" target="_blank"
                            href={program.changes_sheet}><i
                                className="fas fa-link"></i></a> : null}
                    </td>
                </tr>;
        });

        const template = rows.length === 0 ?
            <Loader /> :
            <table className="table">
                <thead>
                    <tr>
                        <th>Код</th>
                        <th>Дисциплина/практика (с приложением ОММ/ФОС)</th>
                        <th>Лист изменений</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>;

        return <div className="students-docs">
            <h3 className={'mb-3'}>
                Рабочие программы учебных дисциплин, практик
            </h3>
            <div className={'mb-3'}>
                <input autoFocus className={'form-control'} onChange={this.search} type="text"
                    placeholder="Дисциплина/практика" />
            </div>
            {template}
        </div>
    }
}

export default withParams(ProgramsPage);