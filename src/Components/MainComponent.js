import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Axios from 'axios';

import NavComponent from './NavComponent';
import StudentsComponent from './StudentsComponent';
import StudentComponent from './StudentComponent';
import CoursesComponent from './CoursesComponent';
import AddStudentFormComponent from './AddStudentFormComponent';
import { baseUrl } from '../config';

// DO ERROR HANDLING

function MainComponent() {
    const [allStudents, setAllStudents] = useState({ loading: false, errmsg: '', data: [] });
    const [allCourses, setAllCourses] = useState({ loading: false, errmsg: '', data: [] });

    const axios = Axios.create({ baseURL: baseUrl });

    // Get students and assign it to the allStudents state
    useEffect(() => {
        setAllStudents({ ...allStudents, loading: true });

        axios
            .get('/students')
            .then((response) => {
                setTimeout(function () {
                    setAllStudents({ ...allStudents, loading: false, data: response.data });
                }, 1000);
            })
            .catch((error) => {
                console.log('Error in fetching students: ', error.message);
                let errorMsg = 'Error in fetching students. Please try again later.';
                setAllStudents({ ...allStudents, loading: false, errmsg: errorMsg });
            });
    }, [allStudents.data.length]);

    // Get courses and assign it to the allCourses state
    useEffect(() => {
        setAllCourses({ ...allCourses, loading: true });

        axios
            .get('/courses')
            .then((response) => {
                setTimeout(function () {
                    setAllCourses({ ...allCourses, loading: false, data: response.data });
                }, 1000);
            })
            .catch((error) => {
                console.log('Error in fetching courses: ', error);
                let errorMsg = 'Error in fetching courses. Please try again later.';
                setAllCourses({ ...allCourses, loading: false, errmsg: errorMsg });
            });
    }, [allCourses.data.length]);

    return (
        <div>
            <NavComponent />

            <div className='container mt-3 mb-5'>
                {/* Routes */}
                <Switch>
                    <Route path='/students/:studentId'>
                        <StudentComponent allStudents={allStudents} allCourses={allCourses} axios={axios} />
                    </Route>
                    <Route exact path='/students'>
                        <StudentsComponent allStudents={allStudents} />
                    </Route>
                    <Route exaxt path='/courses'>
                        <CoursesComponent allCourses={allCourses} />
                    </Route>
                    <Route exaxt path='/add-student'>
                        <AddStudentFormComponent axios={axios} allStudents={allStudents} setAllStudents={setAllStudents} />
                    </Route>
                    {/* Use redirect to specify a default route if routes does not match any above routes */}
                    <Redirect to='/students' />
                </Switch>
            </div>
        </div>
    );
}

export default withRouter(MainComponent);
