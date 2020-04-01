import React from 'react';

import { Loading } from './LoadingComponent';

function CoursesComponent(props) {
    //console.log('Props in coursesComponent is ', props);
    const allCourses = props.allCourses;

    console.log('All courses is ', allCourses);

    // Courses loading
    if (allCourses.loading === true) {
        return <Loading />;
    }

    // If error
    if (allCourses.errmsg) {
        return <p className='text-center'>{allCourses.errmsg}</p>;
    }

    // If no courses
    if (allCourses.data.length < 1) {
        return <div className='text-center'>No courses available</div>;
    }

    return (
        <div>
            <h3>All Courses</h3>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {allCourses.data.map((course) => {
                        return (
                            <tr key={course.id}>
                                <td>{course.name}</td>
                                <td>{course.startdate}</td>
                                <td>{course.enddate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CoursesComponent;
