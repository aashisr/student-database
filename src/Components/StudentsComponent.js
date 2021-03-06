import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LoadingComponent from './LoadingComponent';

function StudentsComponent(props) {
    let [studentsToDisplay, setStudentsToDisplay] = useState(props.allStudents);

    // State does not get updated when the props changes.
    //So, each time props.allStudents changes we need to sync it to allStudents state
    // Sync the props.allStudents to allStudents state
    useEffect(() => {
        setStudentsToDisplay(props.allStudents);
    }, [props.allStudents]);

    // Search
    const handleSearchTextChange = (event) => {
        // Should always be filtered from source data, not from displayed data
        const filteredStudents = props.allStudents.data.filter((student) => {
            // Only return the students whose name matches the searchText, case insensitive
            return student.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
        });

        setStudentsToDisplay({ ...studentsToDisplay, data: filteredStudents });
    };

    // If no students
    if (studentsToDisplay.loading === true) {
        return <LoadingComponent />;
    }

    // If error
    if (studentsToDisplay.errmsg) {
        return (
            <div className='alert alert-danger' role='alert'>
                {studentsToDisplay.errmsg}
            </div>
        );
    }

    // If no students
    if (studentsToDisplay.data.length < 1) {
        return <div className='text-center'>No students</div>;
    }

    return (
        <div>
            <div className='row mb-1'>
                <div className='col-12 col-sm-6'>
                    <h3>All students</h3>
                </div>
                <div className='col-12 col-sm-4 ml-auto mb-2 mb-sm-0'>
                    <input className="form-control" type='text' name='search' onChange={handleSearchTextChange} placeholder='Search'></input>
                </div>
            </div>
            <table className='table table-striped table-responsive-md'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Birthday</th>
                    </tr>
                </thead>
                <tbody>
                    {studentsToDisplay.data.map((student) => {
                        return (
                            <tr key={student.id}>
                                <td>
                                    <Link to={`/students/${student.id}`}>{student.name}</Link>
                                </td>
                                <td>{student.address}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>{student.birthday}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Link to='/add-student'>
                <button className='btn btn-primary'>Add Student</button>
            </Link>
        </div>
    );
}

export default StudentsComponent;
