import React from 'react';

import {Eui} from "../../../models/student/Eui";
import {EuiEios} from '../../../api/eios/student/EuiEios';
import {withParams} from "../../helpers";
import {Loader} from "../../../components/loader";

class EuiPage extends React.Component {
    state = {
        eui: []
    }

    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const eui = await new EuiEios().all();

        this.setState({eui: eui})
    }

    search(e) {
        const {value} = e.target;
        let newList = this.state.eui;

        if (value.length > 0) {
            newList = newList.map(item => {
                item.hide = (!item.name.toLowerCase().includes(value.toLowerCase())) && (!item.authors.toLowerCase().includes(value.toLowerCase()));

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
            return item.hide ? null : <tr key={indx}>
                <td>{item.name} <strong>{item.authors}</strong></td>
                <td>
                    <a className="btn btn-sm btn-tspu " href={item.link} target="_blank"><i
                        className="fa fa-link"></i></a>
                </td>
            </tr>
        });

        const template = rows.length === 0 ? <Loader/> : <table className="table">
            <thead>
            <tr>
                <th>Название</th>
                <th>Ссылка</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>;

        return <div className="students-eor">
            <h3 className={'mb-3'}>
                Электронные учебные издания, указанные в рабочих программах
            </h3>
            <div className={'mb-3'}>
                <input autoFocus onChange={this.search} type="text" className={'form-control'} placeholder="Название"/>
            </div>
            {template}
        </div>;
    }
}

export default withParams(EuiPage);