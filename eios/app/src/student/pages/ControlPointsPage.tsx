import React from 'react';

import { ControlPointsEios } from '../../api/eios/ControlPointsEios';

class ControlPointsPage extends React.Component {
  state = {
    controlPoints: [],
    filter: {
      name: '',
      score: ''
    }
  }
  constructor(props) {
    super(props);
    this.handlePointFilter = this.handlePointFilter.bind(this);
  }

  componentDidMount() {
    this.request();
  }

  async request() {
    const controlPoints = await new ControlPointsEios().all();

    this.setState({ controlPoints: controlPoints })
  }


  setControlPoints(points) {
    this.setState({
      controlPoints: points
    });
  }

  search = search => {
    this.setState({
      filter: {
        name: search,
        score: this.state.filter.score
      }
    });

    if (search !== '') {
      const { controlPoints } = this.state;
      if ((this.state.filter.score !== '')) {
        this.setControlPoints(controlPoints.map(point => {
          point.hide = !(point.name_dis.toLowerCase().includes(search.toLowerCase()) && ((point.mark_name === this.state.filter.score)));

          return point;
        }));
      } else {
        this.setControlPoints(controlPoints.map(point => {
          point.hide = !(point.name_dis.toLowerCase().includes(search.toLowerCase()));

          return point;
        }));
      }
    } else {
      this.resetFilter();
    }
  }
  handlePointFilter(type: string) {
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
        this.resetFilter();
        break;
    }
  }
  generalFilter(field, val) {
    const { controlPoints } = this.state;
    this.resetFilterValue();

    this.setControlPoints(controlPoints.map(point => {
      point.hide = !((point[field] === val) && point.name_dis.toLowerCase().includes(this.state.filter.name.toLowerCase()));
      this.setState({
        filter: {
          score: val,
          name: this.state.filter.name,
        }
      })
      return point;
    }));
  }

  pointFilter(val: string) {
    this.generalFilter('mark_name', val);
  }
  resetFilterValue() {
    this.setState({
      filter: {
        name: ''
      }
    });
  }

  resetFilter() {
    const { controlPoints } = this.state;

    this.setControlPoints(controlPoints.map(point => {
      point.hide = false;

      return point;
    }));
  }


  render() {

    const rows = this.state.controlPoints.map((point, indx) => {
      const mark = point.mark_name !== "" ? point.mark_name : 'не выбрано';
      return point.hide ? '' : <tr key={indx}>
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
        <FilterComponent app_state={this.state} onSearch={this.search} onPointFilter={this.handlePointFilter} />

        <table className="table">
          <thead>
            <tr>
              <th>Дисциплина</th>
              <th>Семестр</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>

            {rows}</tbody></table></div></div>
  }

}

interface FilterInterface {
  onSearch;
  onPointFilter;
  app_state;
}

class FilterComponent extends React.Component<FilterInterface> {

  render() {
    const { onSearch, onPointFilter, app_state } = this.props;

    return <div>
      <input onChange={e => { onSearch(e.target.value) }} value={app_state.filter.text} type="text" placeholder="Поиск..." />
      <select onChange={e => { onPointFilter(e.target.value) }} >
        <option value=''>Все</option>
        <option value='excellent'>Отлично</option>
        <option value='good'>Хорошо</option>
        <option value='well'>Удовлетворительно</option>
        <option value='fail'>Неудовлетворительно</option>
      </select>

    </div>


  }
}

export default ControlPointsPage;