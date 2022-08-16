import React from 'react';

import { Marks } from "../../models/student/Marks";
import { MarksEios } from '../../api/eios/MarksEios';

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

    this.setState({ marks: marks })
    this.setState({ filtered: marks })
  }


  search = search => {
    let current = [];
    let newList = [];

    if (search !== '') {
      current = this.state.filtered
      newList = current.filter(point => {
        const lc = point.discipline_name.toLowerCase();
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

  pointFilter(val: string) {
    this.setState({
      filtered: this.state.filtered.filter(point => point.mark_name === val)
    })
  }

  examFilter(val: number) {
    this.setState({
      filtered: this.state.filtered.filter(point => point.is_examen === val)
    })
  }

  handleClick(type: string) {
    switch (type) {
      case 'excellent':
        this.pointFilter('отлично')
        break;
      case 'good':
        this.pointFilter('хорошо')
        break;
      case 'well':
        this.pointFilter('удовлетворительно')
        break;
      case 'fail':
        this.pointFilter('неудовлетворительно')
        break;
      case 'exam':
        this.examFilter(1)
        break;
      case 'zachet':
        this.examFilter(0)
        break;

      default:
        this.setState({
          filtered: [...this.state.marks]
        });
        break;
    }
  }

  render() {
    const rows = this.state.filtered.map((mark, indx) => {
      const exam = mark.is_examen === 1 ? ' ✓' : '';
      const zachet = mark.is_examen !== 1 ? ' ✓' : '';

      return <tr>
        <td width="50%">{mark.discipline_name}</td>
        <td>{mark.mark_name}</td>
        <td align="center">{zachet}</td>
        <td align="center"> {exam} </td>
        <td align="center">{mark.number_of_semester}</td>
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

        <div >
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
                  placeholder="Поиск..." ></input></th>

                <th>    <div className="dropdown">
                  <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    Все
                  </button>
                  <ul className="dropdown-menu ">
                    <li><button className="dropdown-item" onClick={e => { this.handleClick('') }}>Все</button></li>
                    <li><button className="dropdown-item" onClick={e => { this.handleClick('excellent') }}>Отлично</button></li>
                    <li><button className="dropdown-item" onClick={e => { this.handleClick('good') }}>Хорошо</button></li>
                    <li><button className="dropdown-item" onClick={e => { this.handleClick('well') }}>Удовлетворительно</button></li>
                    <li><button className="dropdown-item" onClick={e => { this.handleClick('fail') }}>Неудовлетворительно</button></li>
                  </ul>
                </div>
                </th>
                <th colSpan={2}> <div className="dropdown">
                  <button className="btn btn-light dropdown-toggle  w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    Все
                  </button>
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={e => { this.handleClick('') }}>Все</button></li>
                    <li><button className="dropdown-item" onClick={e => { this.handleClick('zachet') }}>Зачет</button></li>
                    <li><button className="dropdown-item" onClick={e => { this.handleClick('exam') }}>Экзамен</button></li>

                  </ul>
                </div></th>

                <th></th>
              </tr>

              {rows}</tbody></table></div></div></div>
  }

}

export default MarksPage;