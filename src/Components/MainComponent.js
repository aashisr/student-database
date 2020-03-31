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
    const [allStudents, setAllStudents] = useState([]);
    const [allCourses, setAllCourses] = useState([]);

    const axios = Axios.create({ baseURL: 'http://localhost:3000/' });

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
                setAllStudents([...allStudents, data]);
            })
            .catch((error) => {
                console.log('Error in adding student ', error);
            });
    };

    // Get students and assign it to the allStudents state
    useEffect(() => {
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
                //console.log('Finally');
            });
    }, [allStudents.length]);

    // Get courses and assign it to the allCourses state
    useEffect(() => {
        axios
            .get('/courses')
            .then((response) => {
                console.log('Response courses is ', response);
                setAllCourses(response.data);
            })
            .catch((error) => {
                console.log('Error is ', error);
            })
            .then(() => {
                console.log('Finally');
            });
    }, [allCourses.length]);

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
