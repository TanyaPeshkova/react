import React from 'react';
import { Link } from 'react-router-dom';

import { ControlPoints } from "../../models/student/ControlPoints";
import { ControlPointsEios } from '../../api/eios/ControlPointsEios';

class ControlPointsPage extends React.Component {
  state = {
    controlPoints: [new ControlPoints()],
    filtered: []
  }

  componentDidMount() {
    this.request();
  }

  async request() {
    const controlPoints = await new ControlPointsEios().all();

    this.setState({ controlPoints: controlPoints })
    this.setState({ filtered: controlPoints })
  }


  search = search => {
    let current = [];
    let newList = [];

    if (search !== '') {
      current = this.state.controlPoints
      newList = current.filter(point => {
        const lc = point.name_dis.toLowerCase();
        const filter = search.toLowerCase();
        return lc.includes(filter)
      })
    } else {
      newList = this.state.controlPoints;
    }

    this.setState({
      filtered: newList
    })
  }


  pointFilter(val: string) {
    this.setState({
      filtered: this.state.controlPoints.filter(point => point.mark_name === val)
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

      default:
        this.setState({
          filtered: [...this.state.controlPoints]
        });
        break;
    }
  }


  render() {

    const rows = this.state.filtered.map((point, indx) => {
      const mark = point.mark_name !== "" ? point.mark_name : 'не выбрано';
      return <tr key={indx}>
        <td >
          {point.name_dis}
        </td>
        <td>
          {point.n_sem}
        </td>
        <td>
          {mark}
        </td>
      </tr>
    })
    return <div className="container-md container-fluid mt-5 pe-2 ps-2 pe-md-1 ps-md-1">

      <div className="students-kt">
        <div className="h3 pt-3">
          Ход образовательного процесса
        </div>
        <div className="h5 mt-3 mb-5">
          Текущий контроль успеваемости обучающегося (результаты контрольных точек)
        </div>
        <div>
          <a className="btn btn-primary mb-4" href="https://eios.tspu.edu.ru/students/kt/file_export/">
            Скачать данные в Excel-файл</a>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Дисциплина</th>
              <th>Семестр</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><input onChange={e => this.search(e.target.value)}
                type="text"
                placeholder="Поиск..." ></input></th>
              <th></th>
              <th>    <div className="dropdown">
                <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                  Все
                </button>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item" onClick={e => { this.handleClick('') }}>Все</button></li>
                  <li><button className="dropdown-item" onClick={e => { this.handleClick('excellent') }}>Отлично</button></li>
                  <li><button className="dropdown-item" onClick={e => { this.handleClick('good') }}>Хорошо</button></li>
                  <li><button className="dropdown-item" onClick={e => { this.handleClick('well') }}>Удовлетворительно</button></li>
                  <li><button className="dropdown-item" onClick={e => { this.handleClick('fail') }}>Неудовлетворительно</button></li>
                </ul>
              </div>
              </th>
            </tr>

            {rows}</tbody></table></div></div>
  }

}


export default ControlPointsPage;