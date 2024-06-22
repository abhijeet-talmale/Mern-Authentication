import React from 'react';
import { useFormik } from 'formik';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    email: ''
};

const ForgotPassword = () => {
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;

    const { values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: (values, { setSubmitting }) => {
            Axios.post('http://localhost:3000/auth/forgot-password', values)
                .then(response => {
                    console.log('API response:', response.data); // Log the entire response
                    if (response.data.status) {
                        console.log('Email sent successfully');
                        alert('Check Your Email For Reset Password Link');
                        navigate('/login');
                    } 
                    else {
                        alert('Failed to send reset password email.');
                    }
                })
                .catch(err => {
                    console.log('API error:', err); // Log the error
                    alert('An error occurred. Please try again later.');
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    });

    return (
        <div className='container border p-3 rounded border-2 w-50 mx-auto justify-content-center mt-5 mb-3'>
            <h1>Forgot Password</h1>
            <form className='' onSubmit={event => {
                    event.preventDefault(); // Prevent the default form submission
                    handleSubmit(event); // Call Formik's handleSubmit
                }}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
