import React from 'react';
import { useFormik } from 'formik';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const initialValues = {
    password: ''
};

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    Axios.defaults.withCredentials = true;

    const { values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: (values, { setSubmitting }) => {
            Axios.post(`http://localhost:3000/auth/reset-password/${token}`, values)
                .then(response => {
                    console.log('API response:', response.data); // Log the entire response
                    if (response.data.status) {
                        console.log('Password reset successfully');
                        alert('Password updated successfully. You can now log in with your new password.');
                        navigate('/login');
                    } else {
                        alert('Failed to reset password. Invalid or expired token.');
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
            <h1>Reset Password</h1>
            <form onSubmit={event => {
                    event.preventDefault(); // Prevent the default form submission
                    handleSubmit(event); // Call Formik's handleSubmit
                }}>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default ResetPassword;
