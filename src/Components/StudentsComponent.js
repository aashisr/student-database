import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {Loading} from './LoadingComponent';

function StudentsComponent(props) {
    console.log('Props in students component is ', props.allStudents);
    let [allStudents, setAllStudents] = useState(props.allStudents);

    // State does not get updated when the props changes.
    //So, each time props.allStudents changes we need to sync it to allStudents state
    // Sync the props.allStudents to allStudents state
    useEffect(() => {
        setAllStudents(props.allStudents);
    }, [props.allStudents]);

    // Search
    const handleSearchTextChange = (event) => {
        // Should always be filtered from source data, not from displayed data
        const filteredStudents = props.allStudents.data.filter((student) => {
            // Only return the students whose name matches the searchText, case insensitive
            return student.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
        });

        setAllStudents({ ...allStudents, data: filteredStudents });
    };

    // If no students
    if (allStudents.loading === true) {
        return (
            <Loading />
        );
    }

    // If error
    if (allStudents.errmsg) {
        return <p className='text-center'>{allStudents.errmsg}</p>;
    }

    // If no students
    if (allStudents.data.length === 0) {
        return <div className='text-center'>No students</div>;
    }

    return (
        <div>
            <div className='row mt-3'>
                <div className='col-6'>
                    <h3>All students</h3>
                </div>
                <div className='col-3 ml-auto'>
                    <input type='text' name='search' onChange={handleSearchTextChange} placeholder='Search'></input>
                </div>
            </div>
            <table className='table table-striped'>
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
                    {allStudents.data.map((student) => {
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
