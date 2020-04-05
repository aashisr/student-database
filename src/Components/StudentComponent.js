import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';

import LoadingComponent from './LoadingComponent';
import NotificationComponent from './NotificationComponent';

function StudentComponent(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState();
    const [addCourseMsg, setAddCourseMsg] = useState({ type: '', msg: '' });

    const toggleModal = () => setModalOpen(!modalOpen);

    // Get the studentId from the match object
    const studentId = parseInt(props.match.params.studentId);

    // Get the student with this id
    const studentArray = props.allStudents.data.filter((student) => student.id === studentId);

    if (props.allStudents.loading === true || props.allCourses.loading === true) {
        return <LoadingComponent />;
    }

    if (studentArray.length < 1) {
        return <p>Student not found</p>;
    }

    const student = studentArray[0];

    // Get the courses of the student
    const courseIds = student.courses;
    const studentCourses = props.allCourses.data.filter((course) => courseIds.indexOf(course.id) !== -1);
    // OtherAvailableCourses is for displaying in AddCourse form
    const otherAvailableCourses = props.allCourses.data.filter((course) => courseIds.indexOf(course.id) === -1);

    const handleAddCourseFormInputChange = (event) => {
        setSelectedCourse(parseInt(event.target.value));
    };

    const handleAddCourseFormSubmit = (event) => {
        event.preventDefault();

        // Copy the student and add the selected course to the courses array
        const studentCopy = { ...student, courses: [...student.courses, selectedCourse] };

        // Add the selected course to the student object
        props.axios
            .put(`/students/${student.id}`, studentCopy)
            .then((result) => {
                // Add this course to the student object
                student.courses.push(selectedCourse);
                setAddCourseMsg({ type: 'success', msg: 'Course added successfully to the student.' });
            })
            .catch((error) => {
                console.log('Add course error is ', error);
                setAddCourseMsg({ type: 'error', msg: 'Error in adding course to the student. Please, try again later.' });
            })
            .finally(() => {
                toggleModal();
                // Display message only for 3 seconds
                setTimeout(() => {
                    setAddCourseMsg({ type: '', msg: '' });
                }, 3000);
            });
    };

    const removeCourse = (courseId) => {
        // Confirm the deletion
        if (window.confirm('Are you sur eyou want to remove the course?')) {
            // return the ids of all courses left after removing the given course id
            const courseIdsAfterRemove = studentCourses.filter((course) => course.id !== courseId).map((course) => course.id);

            // Copy the student and remove the selected course from the courses array
            const studentCopyAgain = { ...student, courses: courseIdsAfterRemove };

            // Add the selected course to the student object
            props.axios
                .put(`/students/${student.id}`, studentCopyAgain)
                .then((result) => {
                    // Replace the courses in student object with the courseIdsAfterRemove
                    student.courses = courseIdsAfterRemove;
                    setAddCourseMsg({ type: 'success', msg: 'Course removed successfully from the student.' });
                })
                .catch((error) => {
                    console.log('Remove course error is ', error);
                    setAddCourseMsg({ type: 'error', msg: 'Error in removing course from the student. Please, try again later.' });
                })
                .finally(() => {
                    // Display message only for 3 seconds
                    setTimeout(() => {
                        setAddCourseMsg({ type: '', msg: '' });
                    }, 3000);
                });
        }
    };

    const CourseList = (courses) => {
        if (courses.courses.length < 1) {
            return <p>No courses</p>;
        } else {
            return (
                <div>
                    {courses.courses.map((oneCourse) => {
                        return (
                            <div key={oneCourse.id} className='row'>
                                <div className='col-10'>
                                    {oneCourse.name} ({oneCourse.startdate} - {oneCourse.enddate})
                                </div>
                                <div className='col-2'>
                                    <span onClick={() => removeCourse(oneCourse.id)} id='deleteCourse'>
                                        <i className='fa fa-trash'></i>
                                    </span>
                                    <UncontrolledTooltip target='deleteCourse'>Remove Course</UncontrolledTooltip>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
    };

    return (
        <div className='row'>
            <div className='col-12'>
                <NotificationComponent message={addCourseMsg} />
            </div>
            <div className='col-12'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <div className='row mb-3 mb-md-0'>
                            <div className='col-12'>
                                <h3>
                                    {student.name} ({student.birthday})
                                </h3>
                            </div>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-4 col-sm-3'>
                                        <span>Address:</span>
                                    </div>
                                    <div className='col-8'>
                                        <span>
                                            {student.address}, {student.zipcode} {student.city}
                                        </span>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 col-sm-3'>
                                        <span>Phone:</span>
                                    </div>
                                    <div className='col-8'>
                                        <span>{student.phone}</span>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 col-sm-3'>
                                        <span>Email:</span>
                                    </div>
                                    <div className='col-8'>
                                        <span>{student.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-12 col-md-6'>
                        <Card>
                            <CardHeader className='bg-success text-white'>Courses</CardHeader>
                            <CardBody>
                                <CourseList courses={studentCourses} />
                                <button className='btn btn-sm btn-primary mt-3' onClick={toggleModal}>
                                    Add Course
                                </button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>

            <Modal isOpen={modalOpen} toggle={toggleModal} centered>
                <ModalHeader toggle={toggleModal} className='bg-primary'>
                    Add course
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className='form-group col-12'>
                            <label htmlFor='course'>Select Course</label>
                            <select className='custom-select' id='course' value={selectedCourse} onChange={handleAddCourseFormInputChange}>
                                <option defaultValue>Select course...</option>
                                {otherAvailableCourses.map((course) => {
                                    return (
                                        <option key={course.id} value={course.id}>
                                            {course.name}({course.startdate} to {course.enddate})
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-secondary' onClick={toggleModal}>
                        Cancel
                    </button>
                    <button className='btn btn-primary' onClick={handleAddCourseFormSubmit}>
                        Add course
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default withRouter(StudentComponent);
