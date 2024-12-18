import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from "yup";
import './FormValidation.css';

const FormValidation = () => {
  const initialValues = {
    name: '',
    employeeID: '',
    email: '',
    phone: '',
    department: '',
    dateOfJoining: '',
    role: '',
  };

  const EmployeeSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    employeeID: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, 'Employee ID must be alphanumeric')
      .max(10, 'Employee ID cannot exceed 10 characters')
      .required('Employee ID is required'),
    email: Yup.string()
      .email('Must be a valid email')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits')
      .required('Phone Number is required'),
    department: Yup.string()
      .oneOf(['HR', 'Engineering', 'Marketing', 'IT', 'Finance'], 'Invalid department')
      .required('Department is required'),
    dateOfJoining: Yup.date()
      .max(new Date(), 'Date of Joining cannot be in the future')
      .required('Date of Joining is required'),
    role: Yup.string()
      .required('Role is required'),
  });
  
  const onsubmit = async (values, { setErrors, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:8001/employees', values);
      alert(response.data.message);
      resetForm();
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); 
      } else {
        alert('Employee ID already exists');
      }
    }
  };
  
  

  return (
    <div className='formContainer'>
    <Formik
      initialValues={initialValues}
      validationSchema={EmployeeSchema} 
      onSubmit={onsubmit}
    >
      {() => (
        <Form>
          <div className='formGroup'>
            <label className='formLabel'>Name</label>
            <Field type="text" name="name" className='formInput'/>
            <ErrorMessage name="name" component="div" className='errorMessage'/>
          </div>

          <div className='formGroup'>
            <label className='formLabel'>Employee ID</label>
            <Field type="text" name="employeeID" className='formInput'/>
            <ErrorMessage name="employeeID" component="div" className='errorMessage'/>
          </div>

          <div className='formGroup'>
            <label className='formLabel'>Email</label>
            <Field type="email" name="email" className='formInput'/>
            <ErrorMessage name="email" component="div" className='errorMessage'/>
          </div>

          <div className='formGroup'>
            <label className='formLabel'>Phone Number</label>
            <Field type="text" name="phone" className='formInput'/>
            <ErrorMessage name="phone" component="div" className='errorMessage'/>
          </div>

          <div className='formGroup'>
            <label className='formLabel'>Department</label>
            <Field as="select" name="department" className='formInput'>
              <option value="" label="Select department" />
              <option value="HR" label="HR" />
              <option value="Engineering" label="Engineering" />
              <option value="Marketing" label="Marketing" />
              <option value="IT" label="IT" />
              <option value="Finance" label="Finance" />
            </Field>
            <ErrorMessage name="department" component="div" className='errorMessage'/>
          </div>

          <div className='formGroup'>
            <label className='formLabel'>Date of Joining</label>
            <Field type="date" name="dateOfJoining" className='formInput'/>
            <ErrorMessage name="dateOfJoining" component="div" className='errorMessage'/>
          </div>

          <div className='formGroup'>
            <label className='formLabel'>Role</label>
            <Field type="text" name="role" className='formInput'/>
            <ErrorMessage name="role" component="div" className='errorMessage'/>
          </div>

          <div className='buttonGroup'>
            <button type="submit" className="submitButton">Submit</button>
            <button type="reset" className="resetButton">Reset</button>
          </div>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default FormValidation;