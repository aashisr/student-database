import React, { useState, useEffect } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import NavComponent from './NavComponent';
import StudentsComponent from './StudentsComponent';
import Axios from 'axios';

function MainComponent() {
    const [allStudents, setAllStudents] = useState([]);

    const axios = Axios.create({ baseURL: 'http://localhost:3000/' });
    console.log('Hello');

    useEffect(() => {
        axios
            .get('/students')
            .then((response) => {
				console.log('Response is ', response);
				console.log('Response.data type is ', typeof response.data);
				setAllStudents(response.data);
            })
            .catch((error) => {
                console.log('Error is ', error);
            })
            .then(() => {
                console.log('Finally');
            });
	}, []);
	
	console.log('AllStudentrs is ', allStudents);

	//const allStudents =
	if (allStudents.length === 0) {
		console.log('No students');
		return <div>No students</div>
	}

    return (
        <div>
            <NavComponent />

            {/* Routes */}
            <Switch>
                <Route path='/students'>
                    <StudentsComponent allStudents={allStudents} />
                </Route>
                <Route path='/courses'>
                    <div className='container'>
                        <p>Courses</p>
                    </div>
                </Route>
                {/* Use redirect to specify a default route if routes does not match any above routes */}
                <Redirect to='/students' />
            </Switch>
        </div>
    );
}

export default MainComponent;
