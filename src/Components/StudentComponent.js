import React from 'react'
import { withRouter } from 'react-router-dom';
import { Card, CardHeader, CardBody } from 'reactstrap';

function StudentComponent(props) {
	console.log('Props in StudentComponent is ', props);
	// Get the studentId from the match object
	const studentId = Number(props.match.params.studentId);

	// Get the student with this id
	const studentArray = props.allStudents.filter((student) => student.id === studentId);
	console.log('StudentArray is ', studentArray);
	
	if (studentArray.length < 1) {
		return <p>Student not found</p>
	}

	const student = studentArray[0];

	console.log('Student is ', student);

	// Get the courses of the student
	const courseIds = student.courses;

	const studentCourses = props.allCourses.filter((course) => courseIds.indexOf(course.id) !== -1);

	console.log('Student courses is ', studentCourses);

	return (
        <div className='container'>
            <div className='row mt-3'>
                <div className='col-6 row'>
                    <div className='col-12'>
                        <h3>
                            {student.name} ({student.birthday})
                        </h3>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-2'>
                                <span>Address:</span>
                            </div>
                            <div className='col-6'>
                                <span>
                                    {student.address}, {student.zipcode} {student.city}
                                </span>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-2'>
                                <span>Phone:</span>
                            </div>
                            <div className='col-6'>
                                <span>{student.phone}</span>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-2'>
                                <span>Email:</span>
                            </div>
                            <div className='col-6'>
                                <span>{student.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <Card>
                        <CardHeader className='bg-success text-white'>Courses</CardHeader>
                        <CardBody>
                            {studentCourses.map((oneCourse) => {
                                return (
                                    <ul key={oneCourse.id}>
                                        <li>
                                            {oneCourse.name} ({oneCourse.startdate} - {oneCourse.enddate})
                                        </li>
                                    </ul>
                                );
                            })}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default withRouter(StudentComponent);
