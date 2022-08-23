import {useRoutes} from '../../routes';
import {BrowserRouter as Router, Link, Routes} from 'react-router-dom';

import ReactDOM from "react-dom";

const StudentApp = () => {
    return <Router>{useRoutes()}</Router>;
}

ReactDOM.render(<StudentApp/>, document.getElementById('root'));
