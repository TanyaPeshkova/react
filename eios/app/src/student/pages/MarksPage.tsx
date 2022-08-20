import React from 'react';

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
        name: search,
        exam: this.state.filter.exam,
        score: this.state.filter.score
      }
    });

    if (search !== '') {
      const { marks } = this.state;
      if ((this.state.filter.exam !== '') || (this.state.filter.score !== '')) {
        this.setMarks(marks.map(point => {
          point.hide = !(point.discipline_name.toLowerCase().includes(search.toLowerCase()) && (((point.is_examen === this.state.filter.exam)) || (point.mark_name === this.state.filter.score)));

          return point;
        }));
      } else {
        this.setMarks(marks.map(point => {
          point.hide = !(point.discipline_name.toLowerCase().includes(search.toLowerCase()));

          return point;
        }));
      }
    } else {
      this.resetFilter();
    }
  }

  resetFilterValue() {
    this.setState({
      filter: {
        name: ''
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
      point.hide = !((point[field] === val) && point.discipline_name.toLowerCase().includes(this.state.filter.name.toLowerCase()));
      if (field === 'is_examen') {
        this.setState({
          filter: {
            exam: val,
            name: this.state.filter.name,
            score: this.state.filter.score
          }
        })
      } else {
        this.setState({
          filter: {
            score: val,
            name: this.state.filter.name,
            exam: this.state.filter.exam
          }
        })
      }
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
          <FilterComponent app_state={this.state} onSearch={this.search} onPointFilter={this.handlePointFilter} onExamFilter={this.handleExamFilter} />
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

    return <div>
      <input onChange={e => { onSearch(e.target.value) }} value={app_state.filter.text} type="text" placeholder="Поиск..." />
      <select onChange={e => { onPointFilter(e.target.value) }} >
        <option value=''>Все</option>
        <option value='excellent'>Отлично</option>
        <option value='good'>Хорошо</option>
        <option value='well'>Удовлетворительно</option>
        <option value='fail'>Неудовлетворительно</option>
      </select>
      <select onChange={e => { onExamFilter(e.target.value) }}>
        <option value=''>Все</option>
        <option value='exam'>Экзамен</option>
        <option value='zachet'>Зачет</option>
      </select>

    </div>


  }
}

export default MarksPage;