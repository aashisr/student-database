import React from 'react';
import { Link } from 'react-router-dom';

function StudentsComponent(props) {
    console.log('Props in students component is ', props);

    //const allStudents =
    if (props.allStudents.length === 0) {
        console.log('No students');
        return <div>No students</div>;
    }

    return (
        <div className='container'>
            <h3>All students</h3>
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
                    {props.allStudents.map((student) => {
                        return (
                            <tr key={student.id}>
                                <Link to={`/students/${student.id}`}>
                                    <td>{student.name}</td>
                                </Link>
                                <td>{student.address}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>{student.birthday}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button className='btn btn-primary'>Add Student</button>
        </div>
    );
}

export default StudentsComponent;
