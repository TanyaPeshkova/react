import React from 'react';

import { Marks } from "../../models/student/Marks";
import { MarksEios } from '../../api/eios/MarksEios';
import { type } from 'os';

class MarksPage extends React.Component {

  state = {
    marks: [],
    filter: {
      name: '',
      exam: '',
      score: '',
    }
  }

  constructor(props) {
    super(props);

    this.handleExamFilter = this.handleExamFilter.bind(this);
    this.handlePointFilter = this.handlePointFilter.bind(this);
  }

  componentDidMount() {
    this.request();
  }

  async request() {
    const marks = await new MarksEios().all();

    this.setState({ marks: marks })
  }

  setMarks(marks) {
    this.setState({
      marks: marks
    });
  }

  search = search => {
    this.setState({
      filter: {
        text: search
      }
    });

    if (search !== '') {
      const { marks } = this.state;

      this.setMarks(marks.map(point => {
        point.hide = !point.discipline_name.toLowerCase().includes(search.toLowerCase());

        return point;
      }));
    } else {
      this.resetFilter();
    }
  }

  resetFilterValue() {
    this.setState({
      filter: {
        text: ''
      }
    });
  }

  resetFilter() {
    const { marks } = this.state;

    this.setMarks(marks.map(point => {
      point.hide = false;

      return point;
    }));
  }

  generalFilter(field, val) {
    const { marks } = this.state;

    this.resetFilterValue();

    this.setMarks(marks.map(point => {
      point.hide = !(point[field] === val);

      return point;
    }));
  }

  pointFilter(val: string) {
    this.generalFilter('mark_name', val);
  }

  examFilter(val: number) {
    this.generalFilter('is_examen', val);
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

  handleExamFilter(type: string) {
    switch (type) {
      case 'exam':
        this.examFilter(1)
        break;
      case 'zachet':
        this.examFilter(0)
        break;
      default:
        this.resetFilter();
        break;
    }
  }

  render() {
    const rows = this.state.marks.map((mark, indx) => {
      const exam = mark.is_examen === 1 ? ' ✓' : '';
      const zachet = mark.is_examen !== 1 ? ' ✓' : '';

      return mark.hide ? '' : <tr key={indx}>
        <td width="50%">{mark.discipline_name}</td>
        <td>{mark.mark_name}</td>
        <td align="center">{zachet}</td>
        <td align="center"> {exam} </td>
        <td align="center">{mark.number_of_semester}</td>
      </tr>
    });

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
              <FilterComponent app_state={this.state} onSearch={this.search} onPointFilter={this.handlePointFilter} onExamFilter={this.handleExamFilter} />

              {rows}</tbody></table></div></div></div>
  }

}


interface FilterInterface {
  onSearch;
  onPointFilter;
  onExamFilter;
  app_state;
}

class FilterComponent extends React.Component<FilterInterface> {

  render() {
    const { onSearch, onPointFilter, onExamFilter, app_state } = this.props;

    return <tr>
      <th>
        <input onChange={e => { onSearch(e.target.value) }} value={app_state.filter.text} type="text" placeholder="Поиск..." />
      </th>

      <th>    <div className="dropdown">
        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
          Все
        </button>
        <ul className="dropdown-menu">
          <li><button className="dropdown-item" onClick={e => { onPointFilter('') }}>Все</button></li>
          <li><button className="dropdown-item" onClick={e => { onPointFilter('excellent') }}>Отлично</button></li>
          <li><button className="dropdown-item" onClick={e => { onPointFilter('good') }}>Хорошо</button></li>
          <li><button className="dropdown-item" onClick={e => { onPointFilter('well') }}>Удовлетворительно</button></li>
          <li><button className="dropdown-item" onClick={e => { onPointFilter('fail') }}>Неудовлетворительно</button></li>
        </ul>
      </div>
      </th>
      <th colSpan={2}> <div className="dropdown">
        <button className="btn btn-light dropdown-toggle  w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
          Все
        </button>
        <ul className="dropdown-menu">
          <li><button className="dropdown-item" onClick={e => { onExamFilter('') }}>Все</button></li>
          <li><button className="dropdown-item" onClick={e => { onExamFilter('zachet') }}>Зачет</button></li>
          <li><button className="dropdown-item" onClick={e => { onExamFilter('exam') }}>Экзамен</button></li>

        </ul>
      </div></th>

      <th></th>
    </tr>
  }
}

export default MarksPage;