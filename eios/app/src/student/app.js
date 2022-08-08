import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useRoutes} from '../../../routes';
import {BrowserRouter as Router} from 'react-router-dom';
import { createRoot } from 'react-dom/client';




const StudentApp = () => {
    return <Router>{useRoutes()}</Router>;
}

const root = createRoot(document.getElementById('root'));

root.render(<StudentApp/>);