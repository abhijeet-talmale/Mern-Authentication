import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials=true;
  const handleLogout=()=>{
    axios.get('http://localhost:3000/auth/logout')
    .then(res=>{
      if(res.data.status){
        navigate('/login');
      }
    }).catch(err=>{
      console.log(err);
    })
  }
const[users,setUsers]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3000/auth//getUsers')
    .then(users=>setUsers(users.data))
    .catch(err=>console.log(err))
  },[]);
  return (
    <div>
      <button type="submit" onClick={handleLogout} className='m-5 btn btn-danger justify-content-end'>Logout</button>
      <div className="d-flex w-75 table-responsive  m-auto">
      <table className=" table table-striped table-hover table-bordered  ">
           <thead>
                 <tr>
                  <th>No.</th>
                  <th>Id</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Password</th>
                 </tr>
           </thead>
           <tbody>
            {

Array.isArray(users) && users.map((user, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{user._id}</td>
    <td>{user.username}</td>
    <td>{user.email}</td>
    <td>{user.password}</td>
  </tr>
))

            }    
           </tbody>
      </table>
      </div>
    </div>
  )
}

export default Home