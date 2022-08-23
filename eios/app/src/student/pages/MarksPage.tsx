import React from 'react';
import { MarksEios } from '../../../api/eios/student/MarksEios';
import { withParams } from "../../helpers";


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

    this.search = this.search.bind(this);
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

  search(e) {
    const { value } = e.target;

    this.setState({
      filter: {
        name: value,
        exam: this.state.filter.exam,
        score: this.state.filter.score
      }
    });

    if (value.length > 1) {
      const { marks } = this.state;
      if ((this.state.filter.exam !== '') || (this.state.filter.score !== '')) {
        this.setMarks(marks.map(point => {
          point.hide = !(point.discipline_name.toLowerCase().includes(value.toLowerCase()) && (((point.is_examen === this.state.filter.exam)) || (point.mark_name === this.state.filter.score)));

          return point;
        }));
      } else {
        this.setMarks(marks.map(point => {
          point.hide = !(point.discipline_name.toLowerCase().includes(value.toLowerCase()));

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
    let exam = this.state.filter.exam;
    let name = this.state.filter.name;
    let score = this.state.filter.score;

    this.setMarks(marks.map(point => {
      point.hide = !((point[field] === val) && point.discipline_name.toLowerCase().includes(this.state.filter.name.toLowerCase()));

      if (field === 'is_examen') {
        exam = val;
      } else {
        score = val;
      }

      this.setState({
        filter: {
          exam: exam,
          name: name,
          score: score,
        }
      });

      return point;
    }));
  }

  pointFilter(val: string) {
    this.generalFilter('mark_name', val);
  }

  examFilter(val: number) {
    this.generalFilter('is_examen', val);
  }

  handlePointFilter(e) {
    const { value } = e.target;

    switch (value) {
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

  handleExamFilter(e) {
    const { value } = e.target;
    switch (value) {
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
      const exam = mark.is_examen === 1 ? ' ✓' : null;
      const zachet = mark.is_examen !== 1 ? ' ✓' : null;

      return mark.hide ? null : <tr key={indx}>
        <td width="50%">{mark.discipline_name}</td>
        <td>{mark.mark_name}</td>
        <td align="center">{zachet}</td>
        <td align="center">{exam}</td>
        <td align="center">{mark.number_of_semester}</td>
      </tr>
    });

    return <div className="students-marks">
      <h3 className="mb-3">
        Результаты промежуточной аттестации
      </h3>
      <h5 className="mb-3">
        Оценки по результатам сессий
      </h5>
      <div className={'mb-3'}>
        <a className="btn btn-sm btn-tspu " href="/students/marks/file_export/">
          Скачать данные в Excel-файл</a>
      </div>
      <div className={'mb-3'}>
        <FilterComponent
          app_state={this.state}
          onSearch={this.search}
          onPointFilter={this.handlePointFilter}
          onExamFilter={this.handleExamFilter} />
      </div>
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
        <tbody>{rows}</tbody>
      </table>
    </div>;
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

    return <div className={'row mb-3'}>
      <div className="col-6">
        <input autoFocus onChange={onSearch}
          className={'form-control'}
          value={app_state.filter.text}
          type="text"
          placeholder="Дисциплина" />
      </div>
      <div className="col-3">
        <select onChange={onPointFilter} className={'form-control'}>
          <option value=''>Все</option>
          <option value='excellent'>Отлично</option>
          <option value='good'>Хорошо</option>
          <option value='well'>Удовлетворительно</option>
          <option value='fail'>Неудовлетворительно</option>
        </select>
      </div>
      <div className="col-3">
        <select onChange={onExamFilter} className={'form-control'}>
          <option value=''>Все</option>
          <option value='exam'>Экзамен</option>
          <option value='zachet'>Зачет</option>
        </select>
      </div>
    </div>;
  }
}

export default withParams(MarksPage);