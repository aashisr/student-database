import React, { useState } from 'react';

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

    const handleInputChange = (event) => {
        // Set the changed input values to the studentDetails state
        setStudentDetails({ ...studentDetails, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = (event) => {
        // Submit the studentDetails values to the postStudentDetails function in MainComponent
        props.postStudentDetails(studentDetails);

        //TODO: Reset form if succeeds
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

        event.preventDefault();
    };

    return (
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
    );
}

export default AddStudentFormComponent;
