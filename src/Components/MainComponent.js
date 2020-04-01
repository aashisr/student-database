import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import NavComponent from './NavComponent';
import StudentsComponent from './StudentsComponent';
import StudentComponent from './StudentComponent';
import CoursesComponent from './CoursesComponent';
import AddStudentFormComponent from './AddStudentFormComponent';
import Axios from 'axios';

// DO ERROR HANDLING

function MainComponent() {
    const [allStudents, setAllStudents] = useState({ loading: false, errmsg: '', data: [] });
    const [allCourses, setAllCourses] = useState({ loading: false, errmsg: '', data: [] });

    const axios = Axios.create({ baseURL: 'http://localhost:3000/' });

    // Get students and assign it to the allStudents state
    useEffect(() => {
        setAllStudents({ ...allStudents, loading: true });

        axios
            .get('/students')
            .then((response) => {
                setTimeout(function() {
                    console.log('Response students is ', response);
                    setAllStudents({ ...allStudents, loading: false, data: response.data });
                }, 2000);
            })
            .catch((error) => {
                console.log('Error is ', error.message);
                let errorMsg = 'Something went wrong. Please try again later.';
                setAllStudents({ ...allStudents, loading: false, errmsg: errorMsg });
            });
    }, [allStudents.data.length]);

    // Get courses and assign it to the allCourses state
    useEffect(() => {
        setAllCourses({ ...allCourses, loading: true });

        axios
            .get('/courses')
            .then((response) => {
                setTimeout(function() {
                    console.log('Response courses is ', response);
                    setAllCourses({ ...allCourses, loading: false, data: response.data });
                }, 2000);
            })
            .catch((error) => {
                console.log('Error is ', error);
                let errorMsg = 'Something went wrong. Please try again later.';
                setAllCourses({ ...allCourses, loading: false, errmsg: errorMsg });
            });
    }, [allCourses.data.length]);

    // Post student
    const postStudentDetails = (studentDetails) => {
        console.log('Post student Values ', studentDetails);
        //const values = studentDetails.values;
        axios
            .post('/students', studentDetails)
            .then((result) => {
                //console.log('Post student Result is ', result);
                const data = result.data;
                // Add the result to the allStudents state
                setAllStudents({ ...allStudents, data: [...allStudents.data, data] });
            })
            .catch((error) => {
                console.log('Error in adding student ', error);
            })
            .finally(() => {
                console.log('Redirect to main page')
                return <Redirect to='/students' />;
            });
    };

    //console.log('AllStudents is ', allStudents);
    //console.log('AllCources is ', allCourses);

    return (
        <div>
            <NavComponent />

            <div className='container mt-3'>
                {/* Routes */}
                <Switch>
                    <Route path='/students/:studentId'>
                        <StudentComponent allStudents={allStudents} allCourses={allCourses} />
                    </Route>
                    <Route exact path='/students'>
                        <StudentsComponent allStudents={allStudents} />
                    </Route>
                    <Route exaxt path='/courses'>
                        <CoursesComponent allCourses={allCourses} />
                    </Route>
                    <Route exaxt path='/add-student'>
                        <AddStudentFormComponent postStudentDetails={postStudentDetails} />
                    </Route>
                    {/* Use redirect to specify a default route if routes does not match any above routes */}
                    <Redirect to='/students' />
                </Switch>
            </div>
        </div>
    );
}

export default withRouter(MainComponent);
