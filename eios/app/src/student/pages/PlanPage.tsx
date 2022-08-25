import React from 'react';
import { PlanEios } from "../../../api/eios/student/PlanEios";
import { Loader } from "../../../comonents/loader";
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
        const { plan } = this.state;
        const template = plan.length === 0 ? <Loader /> :
            <ButtonComponent elements={this.state.plan} />
        return <div className={'student-plan'}>
            <HeaderComponent />
            {template}
        </div>;
    }
}

class HeaderComponent extends React.Component {
    render() {
        return <h3 className={'mb-3'}>Учебный план</h3>
    }
}
interface PlanInterface {
    groups: string;
    groups_ousk: string;
    plan_id: number;
    speciality_id: number;
    speciality_code: string;
    speciality_name: string;
    education_level_id: number;
    op_full_name: string;
    op_id: number;
    plan_server_id: number;
    url: string;
    url_kug: string;
    op_actual: number;
    up_actual: number;
    up_public: number;
    hide?: boolean;
}

interface ButtonProps {
    elements: PlanInterface[]
}


class ButtonComponent extends React.Component<ButtonProps> {
    render() {
        const { elements } = this.props
        const rows = elements.map((item, indx) => {
            return <div className="row mb-3" key={indx}>
                <div className="col-md-12 mx-auto">
                    <a className="btn btn-sm btn-tspu text-white" href={item.url} target="_blank">
                        Учебный план <i className="fa fa-link"></i></a>
                </div>
            </div>;
        })
        return <>
            {rows}</>
    }
}

export default withParams(PlanPage);