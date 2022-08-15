import React from 'react';
import { Link } from 'react-router-dom'

import { StudentEios } from "../../models/student/StudentEios";
import { ProfileEios } from "../../api/eios/ProfileEios";


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
        const student_id = this.state.profile.map((person, indx) => {
            return <h3 className="mb-5 mt-5" data-id={person.id} key={indx + 1}>Профиль обучающегося</h3>
        })

        const rows = this.state.profile.map((person, indx) => {
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
                    <td><a href="/students/edit/"
                        className="btn btn-sm btn-outline-primary float-right js-add-phone">
                        <i className="fa fa-plus"></i>
                    </a> </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><a href="/students/edit/"
                        className="btn btn-sm btn-outline-primary float-right js-add-phone">
                        <i className="fa fa-plus"></i>
                    </a></td>
                </tr>

            </tbody>
        })
        
        return <div className="student-profile person-profile">
            <div className="row">
                <div className="col mt-5">
                    {student_id}
                </div>
            </div><div className='row'>
                <div className='col-12'><table className="table person-info-list">
                    {rows}</table>
                </div></div></div>
    }

}


export default ProfilePage;