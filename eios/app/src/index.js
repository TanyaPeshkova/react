import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import ProfilePage from './administration/student/pages/ProfilePage.tsx';
import { ProfileEios } from './api/eios/ProfileEios';



// import MainComponent from './MainComponent';
// import StudentsPage from './administration/student/pages/StudentsPage.tsx';







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfilePage /> );