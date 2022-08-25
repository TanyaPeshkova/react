import React from 'react';

import { StudentEios } from "../../../models/student/StudentEios";
import { ProfileEios } from "../../../api/eios/student/ProfileEios";
import { withParams } from "../../helpers";
import { Loader } from "../../../comonents/loader";



class ProfilePage extends React.Component {
    state = {
        profile: [new StudentEios()]
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const profile = await new ProfileEios().all();

        this.setState({ profile: profile })
    }

    render() {
        const { profile } = this.state;
        const template = profile.length === 0 ? <Loader /> :
            <TableComponent elements={this.state.profile} />

        return <div className="student-profile person-profile">
            <div className="row">
                <div className="col mt-5">
                    <HeaderComponent elements={profile} />
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    {template}
                </div>
            </div>
        </div>;
    }

}

interface TableProps {
    elements: StudentEios[]
}

class HeaderComponent extends React.Component<TableProps> {
    render() {
        const { elements } = this.props
        const student_id = elements.map((person, indx) => {
            return <h3 className="mb-5 mt-5" data-id={person.id} key={indx + 1}>Профиль обучающегося</h3>
        })
        return <> {student_id}
        </>
    }
}

class TableComponent extends React.Component<TableProps> {
    render() {
        const { elements } = this.props
        const rows = elements.map((person, indx) => {
            return <tbody key={indx}>
                <tr>
                    <td>Фамилия, имя, отчество (при наличии)</td>
                    <td>{person.fullname}</td>
                </tr>
                <tr>
                    <td>Факультет</td>
                    <td>{person.faculty}</td>
                </tr>
                <tr>
                    <td>Группа</td>
                    <td>{person.group_number}</td>
                </tr>
                <tr>
                    <td>Курс</td>
                    <td>{person.edu_level}</td>
                </tr>
                <tr>
                    <td>Форма обучения</td>
                    <td>{person.form}</td>
                </tr>
                <tr>
                    <td>Направление подготовки</td>
                    <td>{person.special}</td>
                </tr>
                <tr>
                    <td>Направленность (профиль)</td>
                    <td>{person.profiles}</td>
                </tr>
                <tr>
                    <td colSpan={2} className="text-center">
                        <strong>Контактная информация</strong>
                    </td>
                </tr>
                <tr>
                    <td>Телефон</td>
                    <td><a href="/static/app/src/student/pages/ProfilePage"
                        className="btn btn-sm btn-outline-primary float-right js-add-phone">
                        <i className="fa fa-plus"></i>
                    </a></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><a href="/static/app/src/student/pages/ProfilePage"
                        className="btn btn-sm btn-outline-primary float-right js-add-phone">
                        <i className="fa fa-plus"></i>
                    </a></td>
                </tr>
            </tbody>;
        });
        return <table className="table person-info-list">{rows}</table>
    }
}


export default withParams(ProfilePage);