import React from 'react'

import {useFormik} from 'formik';
import Axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'


const initialValues={
    email:'',
    password:''
}

const Login = () => {
    const navigate=useNavigate();
    Axios.defaults.withCredentials=true;
  const {values,errors,handleBlur,handleChange,handleSubmit}=  useFormik({
        initialValues:initialValues,
        onSubmit:(values)=>{
            console.log(values);
            Axios.post('http://localhost:3000/auth/login',values).
            then(response=>{//console.log(response)
                if(response.data.status){
                  alert('Login Successful');
                    navigate('/home');
                }
                
                
            }
                
        )
            .catch(err=>{
                console.log(err);
            })

        }
    })

//console.log(values);

  return (
    <div className='container border p-3 rounded border-2 w-50 mx-auto  justify-content-center mt-5 mb-3'>
        <h1>Login Form</h1>
        <form className='' onSubmit={handleSubmit}>
   <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
     value={values.email}
     onChange={handleChange}
     onBlur={handleBlur}
    
    />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password" className="form-control" id="exampleInputPassword1"
     value={values.password}
     onChange={handleChange}
     onBlur={handleBlur}
    />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <p>Don't Have Account ? <Link to={"/signup"} style={{textDecoration:'none'}}>Sign Up</Link></p>
  <Link to='/forgotpassword'>Forgot Password?</Link> 
</form>
    </div>
  )
}

export default Login