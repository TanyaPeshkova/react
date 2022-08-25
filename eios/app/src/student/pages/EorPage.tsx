import React from 'react';

import { EorEios } from '../../../api/eios/student/EorEios';
import { withParams } from "../../helpers";
import { Loader } from "../../../comonents/loader";

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
        this.setState({ eor: eor });
    }

    search(e) {
        const { value } = e.target;
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

        const { eor } = this.state;

        const template = eor.length === 0 ? <Loader /> :
            <TableComponent elements={this.state.eor} />

        return <div className="students-eor">
            <HeaderComponent onSearch={this.search} />
            {template}
        </div>;
    }
}

interface HeaderInterface {
    onSearch;
}

class HeaderComponent extends React.Component<HeaderInterface> {
    render() {
        const { onSearch } = this.props
        return <>
            < h3 className="mb-3">
                Электронные образовательные ресурсы, указанные в рабочих программах
            </h3>
            <div className={'mb-3'}>
                <input autoFocus
                    onChange={onSearch}
                    type="text"
                    className={'form-control'}
                    placeholder="Название" />
            </div>
        </>
    }
}

interface EorInterface {
    code: number;
    curriculum: string;
    name: string;
    link: string;
    id: number;
    plan: string;
    hide?: boolean;
}

interface TableProps {
    elements: EorInterface[]
}

class TableComponent extends React.Component<TableProps>{
    render() {
        const { elements } = this.props;
        const rows = elements.map((item, indx) => {
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
        return <table className="table">
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
        </table>

    }
}


export default withParams(EorPage); 