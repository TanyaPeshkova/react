import React from 'react';

import { PlanEios } from "../../api/eios/PlanEios";


class PlanPage extends React.Component {
    state = {
        plan: []
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const plan = await new PlanEios().all();

        this.setState({ plan: plan })
    }

    render() {
        const rows = this.state.plan.map((item, indx) => {
            return <div className="row mb-3" key={indx}>
                <div className="col-md-12 mx-auto">
                    <a className="btn btn-primary text-white" href={item.url} target="_blank">Учебный план <i className="fa fa-link"></i></a>
                </div>
            </div >

        })
        return <div> <div className="h3 mb-5 mt-5 pt-5">
            Учебный план
        </div>
            {rows}
        </div >
    }

}


export default PlanPage;