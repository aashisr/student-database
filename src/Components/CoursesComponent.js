import React from 'react'

function CoursesComponent(props) {
	console.log('Props in coursesComponent is ', props);

	return (
        <div className='container'>
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
                    {props.allCourses.map((course) => {
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
