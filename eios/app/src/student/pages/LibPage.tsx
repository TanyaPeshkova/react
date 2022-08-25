import React from "react";
import { LibEios } from "../../../api/eios/student/LibEios";
import { withParams } from "../../helpers";
import { Loader } from "../../../comonents/loader";


class LibPage extends React.Component {
    state = {
        lib: []
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const lib = await new LibEios().all();

        this.setState({ lib: lib })
    }

    render() {
        const { lib } = this.state;
        const template = lib.length === 0 ? <Loader /> :
            <TableComponent elements={lib} />
        return <div className="students-lib mt-5 pt-5">
            <HeaderComponent />
            <div className="row text-center">
                {template}
            </div>
        </div>;
    }
}

class HeaderComponent extends React.Component {
    render() {
        return <h3 className="mb-5">Электронные библиотечные системы</h3>
    }
}

interface LibInterface {
    name: string;
    img: string;
    link: string;
    hide?: boolean;
}
interface TableProps {
    elements: LibInterface[]
}

class TableComponent extends React.Component<TableProps> {
    render() {
        const { elements } = this.props
        const rows = elements.map((item, indx) => {
            return <div className="col-md-6 pt-5" key={indx}>
                <a href={item.link} target="_blank">
                    <img src={item.img} className="img" alt="" />
                    <div className="mt-3">{item.name}</div>
                </a>
            </div>;
        });
        return <>
            {rows}</>
    }
}
export default withParams(LibPage);