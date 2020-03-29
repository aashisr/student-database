import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import NavComponent from './NavComponent';
import StudentsComponent from './StudentsComponent';
import StudentComponent from './StudentComponent';
import CoursesComponent from './CoursesComponent';
import Axios from 'axios';

// DO ERROR HANDLING

function MainComponent() {
    const [allStudents, setAllStudents] = useState([]);
    const [allCourses, setAllCourses] = useState([]);

    const axios = Axios.create({ baseURL: 'http://localhost:3000/' });
    console.log('Hello');

    useEffect(() => {
        // Get students and assign it to the allStudents state
        axios
            .get('/students')
            .then((response) => {
                console.log('Response students is ', response);
                setAllStudents(response.data);
            })
            .catch((error) => {
                console.log('Error is ', error);
            })
            .then(() => {
                console.log('Finally');
            });

        // Get courses and assign it to the allCourses state
        axios
            .get('/courses')
            .then((response) => {
                console.log('Response courses is ', response);
                console.log('Response.data type for courses is ', typeof response.data);
                setAllCourses(response.data);
            })
            .catch((error) => {
                console.log('Error is ', error);
            })
            .then(() => {
                console.log('Finally');
            });
    }, []);

    console.log('AllStudents is ', allStudents);
    console.log('AllCources is ', allCourses);

    return (
        <div>
            <NavComponent />

            {/* Routes */}
            <Switch>
                <Route path='/students/:studentId'>
                    <StudentComponent allStudents={allStudents} allCourses={allCourses} />
                </Route>
                <Route exact path='/students'>
                    <StudentsComponent allStudents={allStudents} />
                </Route>
                <Route exaxt  path='/courses'>
                    <CoursesComponent allCourses={allCourses} />
                </Route>
                {/* Use redirect to specify a default route if routes does not match any above routes */}
                <Redirect to='/students' />
            </Switch>
        </div>
    );
}

export default withRouter(MainComponent);
