import React from "react";
import {LibEios} from "../../../api/eios/student/LibEios";
import {withParams} from "../../helpers";


class LibPage extends React.Component {
    state = {
        lib: []
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const lib = await new LibEios().all();

        this.setState({lib: lib})
    }

    render() {
        const rows = this.state.lib.map((item, indx) => {
            return <div className="col-md-6 pt-5" key={indx}>
                <a href={item.link} target="_blank">
                    <img src={item.img} className="img" alt=""/>
                    <div className="mt-3">{item.name}</div>
                </a>
            </div>;
        });

        return <div className="students-lib mt-5 pt-5">
            <h3 className="mb-5">Электронные библиотечные системы</h3>
            <div className="row text-center">
                {rows}
            </div>
        </div>;
    }
}

export default withParams(LibPage);