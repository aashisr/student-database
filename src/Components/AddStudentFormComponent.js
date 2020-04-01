import React, { useState } from 'react';

import NotificationComponent from './NotificationComponent';

function AddStudentFormComponent(props) {
    // Set studentDetails state as an studentDetail object
    const [studentDetails, setStudentDetails] = useState({
        name: '',
        birthday: '',
        address: '',
        zipcode: '',
        city: '',
        phone: '',
        email: '',
        courses: []
    });

    const [addStudentMsg, setAddStudentMsg] = useState({ type: '', msg: '' });

    // Post student
    const postStudentDetails = (studentDetails) => {
        //const values = studentDetails.values;
        props.axios
            .post('/students', studentDetails)
            .then((result) => {
                //console.log('Post student Result is ', result);
                const data = result.data;
                // Add the result to the allStudents state
                props.setAllStudents({ ...props.allStudents, data: [...props.allStudents.data, data] });

                // Add the success message to addStudnet msg
                setAddStudentMsg({ type: 'success', msg: 'Student added successfully.' });

                // Reset form
                setStudentDetails({
                    name: '',
                    birthday: '',
                    address: '',
                    zipcode: '',
                    city: '',
                    phone: '',
                    email: '',
                    courses: []
                });
            })
            .catch((error) => {
                console.log('Error in adding student ', error);
                // Add the success message to addStudnet msg
                setAddStudentMsg({ type: 'error', msg: 'Error in adding student. Please try again later.' });
            })
            .finally(() => {
                // Display message only for 3 seconds
                setTimeout(() => {
                    setAddStudentMsg({ type: '', msg: '' });
                }, 3000);
            });
    };

    const handleInputChange = (event) => {
        // Set the changed input values to the studentDetails state
        setStudentDetails({ ...studentDetails, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = (event) => {
        // Submit the studentDetails values to the postStudentDetails function in MainComponent
        postStudentDetails(studentDetails);

        event.preventDefault();
    };

    return (
        <div>
            <div className='col-12'>
                <NotificationComponent message={addStudentMsg} />
            </div>

            <form onSubmit={handleSubmitForm}>
                <div className='row mt-3'>
                    <div className='form-group col-6'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' className='form-control' id='name' name='name' placeholder='Name' value={studentDetails.name} onChange={handleInputChange} />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor='address'>Address</label>
                        <input type='text' className='form-control' id='address' name='address' placeholder='Address' value={studentDetails.address} onChange={handleInputChange} />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor='zipcode'>Zipcode</label>
                        <input type='text' className='form-control' id='zipcode' name='zipcode' placeholder='Zipcode' value={studentDetails.zipcode} onChange={handleInputChange} />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor='city'>City</label>
                        <input type='text' className='form-control' id='city' name='city' placeholder='City' value={studentDetails.city} onChange={handleInputChange} />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor='phone'>Phone</label>
                        <input type='text' className='form-control' id='phone' name='phone' placeholder='Phone' value={studentDetails.phone} onChange={handleInputChange} />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' className='form-control' id='email' name='email' placeholder='Email' value={studentDetails.email} onChange={handleInputChange} />
                    </div>
                    <div className='form-group col-12'>
                        <label htmlFor='birthday'>Birthday</label>
                        <input type='text' className='form-control' id='birthday' name='birthday' placeholder='yyyy-mm-dd' value={studentDetails.birthday} onChange={handleInputChange} />
                    </div>
                    <div className='col-4'>
                        <input type='submit' className='btn btn-primary' value='Submit' />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddStudentFormComponent;
