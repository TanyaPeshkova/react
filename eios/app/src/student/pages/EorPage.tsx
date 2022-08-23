import React from 'react';

import {EorEios} from '../../../api/eios/student/EorEios';
import {withParams} from "../../helpers";
import {Loader} from "../../../components/loader";

class EorPage extends React.Component {
    state = {
        eor: [],
    }

    constructor(props) {
        super(props);
        this.search = this.search.bind(this)
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const eor = await new EorEios().all();
        this.setState({eor: eor});
    }

    search(e) {
        const {value} = e.target;
        let newList = this.state.eor;

        if (value.length > 0) {
            newList = newList.map(item => {
                item.hide = !item.name.toLowerCase().includes(value.toLowerCase());

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
        const rows = this.state.eor.map((item, indx) => {
            return item.hide ? null : <tr key={indx}>
                <td>
                    {item.name}
                </td>
                <td>
                    <a className="btn btn-sm btn-tspu " href={item.link} target="_blank"><i
                        className="fa fa-link"></i></a>
                </td>
            </tr>;
        });

        const template = rows.length === 0 ? <Loader/> :
            <table className="table">
                <thead>
                <tr>
                    <th>
                    </th>
                    <th></th>
                </tr>
                <tr>
                    <th>Название</th>
                    <th>Ссылка</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>;

        return <div className="students-eor">
            <h3 className="mb-3">
                Электронные образовательные ресурсы, указанные в рабочих программах
            </h3>
            <div className={'mb-3'}>
                <input autoFocus
                       onChange={this.search}
                       type="text"
                       className={'form-control'}
                       placeholder="Название"/>
            </div>
            {template}
        </div>;
    }
}


export default withParams(EorPage);