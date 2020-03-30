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
            <Link to="/add-student">
                <button className='btn btn-primary'>Add Student</button>
            </Link>
        </div>
    );
}

export default StudentsComponent;
