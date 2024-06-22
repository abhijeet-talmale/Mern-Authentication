import React from 'react'

import {useFormik} from 'formik';
import Axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'


const initialValues={
    username:'',
    email:'',
    password:''
}

const Signup = () => {
    const navigate=useNavigate();
  const {values,errors,handleBlur,handleChange,handleSubmit}=  useFormik({
        initialValues:initialValues,
        onSubmit:(values)=>{
            console.log(values);
            Axios.post('http://localhost:3000/auth/signup',values).
            then(response=>{//console.log(response)
                if(response.data.status){
                    
                    alert('Regiester successfully');
                    navigate('/login');
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
        <h1>Regestration Form</h1>
        <form className='' onSubmit={handleSubmit}>
        <div className="mb-3">
    <label htmlFor="username" className="form-label">UserName</label>
    <input type="text" name="username" className="form-control" id="username" aria-describedby="emailHelp"
    value={values.username}
    onChange={handleChange}
    onBlur={handleBlur}

    />
  </div>         
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
  <p>Already Have Account ? <Link to={"/login"} style={{textDecoration:'none'}}>Login</Link></p> 
</form>
    </div>
  )
}

export default Signup