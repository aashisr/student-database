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
    
    const [touched, setTouched] = useState({
        name: false,
        phone: false,
        email: false
    });

    const [addStudentMsg, setAddStudentMsg] = useState({ type: '', msg: '' });

    // Post student
    const postStudentDetails = (studentDetails) => {
        // Check if student name already exists
        const studentExists = props.allStudents.data.filter((student) => student.name === studentDetails.name);
        console.log('studentExists is ', studentExists);

        if (studentExists.length > 0) {
            // Student already exists, Add the info message to addStudnet msg
            setAddStudentMsg({ type: 'info', msg: 'Student already exists.' });
        } else {
            // Add the student
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

                    // Reset touched
                    setTouched({ name: false, phone: false, email: false });
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
        }
    };

    const handleInputChange = (event) => {
        // Set the changed input values to the studentDetails state
        setStudentDetails({ ...studentDetails, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();

        // Submit the studentDetails values to the postStudentDetails function in MainComponent
        postStudentDetails(studentDetails);
    };

    // Handle blur
    const handleBlur = (event) => {
        const name = event.target.name;

        // Set the touched of touched field to true
        setTouched({ ...touched, [name]: true });
    };

    // Validate the form each time it is rendered
    const validate = () => {
        const errors = {
            name: '',
            phone: '',
            email: ''
        };

        const regexPhone = /^\d+$/;
        const regexEmail = /\S+@\S+\.\S+/;

        if (touched.name && studentDetails.name.length < 5) {
            errors.name = 'Name must be greater than 4 characters.';
        }

        if (touched.name && studentDetails.name.indexOf(' ') === -1) {
            errors.name = 'Name must contain both first name and last name.';
        }

        if (touched.phone && !regexPhone.test(studentDetails.phone)) {
            errors.phone = 'Phone number should contain only numbers.';
        }

        if (touched.email && !regexEmail.test(studentDetails.email)) {
            errors.email = 'Please enter a valid email.';
        }

        return errors;
    };

    // Call the validate function here so that every time the form is rerendered,
    //it validates the form input and returns error messages
    const errorMsg = validate();

    // Component to render error message
    const FormErrorMessage = (field) => {
        if (field.field === 'name' && touched.name === true && errorMsg.name.length > 0) {
            return <small className='formError'>{errorMsg.name}</small>;
        } else if (field.field === 'phone' && touched.phone === true && errorMsg.phone.length > 0) {
            return <small className='formError'>{errorMsg.phone}</small>;
        } else if (field.field === 'email' && touched.email === true && errorMsg.email.length > 0) {
            return <small className='formError'>{errorMsg.email}</small>;
        } else {
            return <div></div>;
        }
    };

    // Submit button
    const SubmitButton = () => {
        if (errorMsg.name.length > 0 || errorMsg.phone.length > 0 || errorMsg.email.length > 0 || touched.name === false) {
            return <input type='submit' className='btn btn-primary' disabled value='Submit' />;
        } else {
            return <input type='submit' className='btn btn-primary' value='Submit' />;
        }
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
                        <input type='text' className='form-control' id='name' name='name' placeholder='Name' value={studentDetails.name} onChange={handleInputChange} onBlur={handleBlur} />
                        <FormErrorMessage field='name' />
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
                        <input type='text' className='form-control' id='phone' name='phone' placeholder='Phone' value={studentDetails.phone} onChange={handleInputChange} onBlur={handleBlur} />
                        <FormErrorMessage field='phone' />
                    </div>
                    <div className='form-group col-6'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' className='form-control' id='email' name='email' placeholder='Email' value={studentDetails.email} onChange={handleInputChange} onBlur={handleBlur} />
                        <FormErrorMessage field='email' />
                    </div>
                    <div className='form-group col-12'>
                        <label htmlFor='birthday'>Birthday</label>
                        <input type='text' className='form-control' id='birthday' name='birthday' placeholder='yyyy-mm-dd' value={studentDetails.birthday} onChange={handleInputChange} />
                    </div>
                    <div className='col-4'>
                        <SubmitButton />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddStudentFormComponent;
