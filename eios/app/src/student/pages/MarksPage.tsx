import React from 'react';
import {Link} from 'react-router-dom';

import {Marks} from "../../models/Marks";
import {MarksEios} from '../../api/eios/MarksEios';

// форматируем код.

class MarksPage extends React.Component {
    state = {
        marks: [new Marks()],
        filtered: []
    }

    componentDidMount() {
        this.request();
    }

    async request() {
        const marks = await new MarksEios().all();

        this.setState({marks: marks})
        this.setState({filtered: marks})
    }

    search = search => {
        let current = [];
        let newList = [];

        if (search !== '') {
            current = this.state.marks
            newList = current.filter(point => {
                const lc = point.DISCIPLINE_NAME.toLowerCase();
                const filter = search.toLowerCase();
                return lc.includes(filter)
            })
        } else {
            newList = this.state.marks;
        }

        this.setState({
            filtered: newList
        })
    }
    All = () => {
        this.setState({
            filtered: [...this.state.marks]
        });
    }

    /*Объединить фильтры по одному типу*/
    Excellent = () => {
        this.setState({
            filtered: this.state.marks.filter(point => point.mark_name === 'отлично')
        });
    }
    Good = () => {
        this.setState({
            filtered: this.state.marks.filter(point => point.mark_name === 'хорошо')
        });
    }
    Well = () => {
        this.setState({
            filtered: this.state.marks.filter(point => point.mark_name === 'удовлетворительно')
        });
    }
    Fail = () => {
        this.setState({
            filtered: this.state.marks.filter(point => point.mark_name === 'неудовлетворительно')
        });
    }

    Zachet = () => {
        this.setState({
            filtered: this.state.marks.filter(point => point.IS_EXAMEN === 0)
        });
    }
    Exam = () => {
        this.setState({
            filtered: this.state.marks.filter(point => point.IS_EXAMEN === 1)
        });
    }


    render() {
        const rows = this.state.filtered.map((mark, indx) => {
            if (mark.IS_EXAMEN === 1) {
                /*закрытие строк ;
                * Константу выносим и делаем переменную через let*/
                const exam = ` ✓`
                const zachet = ''
            } else {
                const exam = ''
                const zachet = ' ✓'
            }

            return <tr>
                <td width="50%">{mark.DISCIPLINE_NAME}</td>
                <td>{mark.mark_name}</td>
                <td align="center">{zachet}</td>
                <td align="center"> {exam} </td>
                <td align="center">{mark.NUMBER_OF_SEMESTER}</td>
            </tr>
        })
        return <div className="container-md container-fluid mt-5 pe-2 ps-2 pe-md-1 ps-md-1">

            <div className="students-marks">
                <div className="h3">
                    Результаты промежуточной аттестации
                </div>
                <div className="h5 mb-5">
                    Оценки по результатам сессий
                </div>
                <div>
                    <a className="btn btn-primary mb-4" href="https://eios.tspu.edu.ru/students/marks/file_export/">
                        Скачать данные в Excel-файл</a>
                </div>

                <div className="marks overflow-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Дисциплина</th>
                            <th>Оценка</th>
                            <th>Зачет</th>
                            <th>Экзамен</th>
                            <th>Семестр</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th><input onChange={e => this.search(e.target.value)}
                                       type="text"
                                       placeholder="Поиск..."></input></th>
                            <th>
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        Все
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button className="dropdown-item" onClick={e => this.All()}>Все</button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={e => this.Excellent()}>Отлично
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={e => this.Good()}>Хорошо</button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item"
                                                    onClick={e => this.Well()}>Удовлетворительно
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item"
                                                    onClick={e => this.Fail()}>Неудовлетворительно
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </th>
                            <th colSpan={2}>
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle  w-100" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        Все
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button className="dropdown-item" onClick={e => this.All()}>Все</button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={e => this.Zachet()}>Зачет
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={e => this.Exam()}>Экзамен
                                            </button>
                                        </li>

                                    </ul>
                                </div>
                            </th>

                            <th></th>
                        </tr>

                        {rows}</tbody>
                    </table>
                </div>
            </div>
        </div>
    }

}


export default MarksPage;