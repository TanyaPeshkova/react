import React from 'react';
import { PlanEios } from "../../../api/eios/student/PlanEios";
import { withParams } from "../../helpers";


class PlanPage extends React.Component {
    state = {
        plan: []
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const plan = await new PlanEios().all();
        this.setState({ plan: plan });
    }

    render() {
        const rows = this.state.plan.map((item, indx) => {
            return <div className="row mb-3" key={indx}>
                <div className="col-md-12 mx-auto">
                    <a className="btn btn-sm btn-tspu text-white" href={item.url} target="_blank">
                        Учебный план <i className="fa fa-link"></i></a>
                </div>
            </div>;
        })
        return <div className={'student-plan'}>
            <h3 className={'mb-3'}>Учебный план</h3>
            {rows}
        </div>;
    }
}

export default withParams(PlanPage);