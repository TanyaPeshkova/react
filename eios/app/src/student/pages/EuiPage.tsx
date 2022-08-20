import React from 'react';

import { Eui } from "../../models/student/Eui";
import { EuiEios } from '../../api/eios/EuiEios';

class EuiPage extends React.Component {
    state = {
        eui: []
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const eui = await new EuiEios().all();

        this.setState({ eui: eui })
    }


    search(query) {
        let newList = this.state.eui;

        if (query.length > 0) {
            newList = newList.map(item => {
                item.hide = (!item.name.toLowerCase().includes(query.toLowerCase())) && (!item.authors.toLowerCase().includes(query.toLowerCase()));

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
        const rows = this.state.eui.map((item, indx) => {
            return item.hide ? '' : <tr key={indx}>
                <td >
                    {item.name}
                    <strong>  {item.authors}</strong>
                </td>
                <td>
                    <a className="btn btn-sm btn-primary " href={item.link} target="_blank"><i
                        className="fa fa-link"></i></a>
                </td>
            </tr>
        })
        return <div className="container-md container-fluid mt-5 pe-2 ps-2 pe-md-1 ps-md-1">

            <div className="students-eor">
                <div className="h3 mb-3 pt-3">
                    Электронные учебные издания, указанные в рабочих программах
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th><input onChange={e => this.search(e.target.value)}
                                type="text"
                                placeholder="Поиск..." ></input></th>
                            <th></th>

                        </tr>
                        <tr>
                            <th>Название</th>
                            <th>Ссылка</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody></table></div></div>
    }

}


export default EuiPage;