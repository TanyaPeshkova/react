import React from 'react';
import {Link} from 'react-router-dom';

import {Eor} from "../../models/Eor";
import {EorEios} from '../../api/eios/EorEios';

class EorPage extends React.Component {
    state = {
        eor: [new Eor()],
        filtered: []
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const eor = await new EorEios().all();

        this.setState({eor: eor})
        this.setState({filtered: eor})
    }


    search = search => {
        let current = [];
        let newList = [];

        if (search !== '') {
            current = this.state.eor
            newList = current.filter(resurs => {
                const lc = resurs.name.toLowerCase();
                const filter = search.toLowerCase();
                return lc.includes(filter)
            })
        } else {
            newList = this.state.eor;
        }

        this.setState({
            filtered: newList
        })
    }

    render() {
        const rows = this.state.filtered.map((resurs, indx) => {
            return <tr key={indx}>
                <td>
                    {resurs.name}
                </td>
                <td>
                    <a className="btn btn-sm btn-primary " href={resurs.link} target="_blank"><i
                        className="fa fa-link"></i></a>
                </td>
            </tr>
        })
        return <div className="container-md container-fluid mt-5 pe-2 ps-2 pe-md-1 ps-md-1">

            <div className="students-eor">
                <div className="h3 mb-5">
                    Электронные образовательные ресурсы, указанные в рабочих программах
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th><input onChange={e => this.search(e.target.value)}
                                   type="text"
                                   placeholder="Поиск..."></input></th>
                        <th></th>

                    </tr>
                    <tr>
                        <th>Название</th>
                        <th>Ссылка</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        </div>
    }

}


export default EorPage;