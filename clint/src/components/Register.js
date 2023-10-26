import React from 'react';
import { MDBBtn, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState} from 'react';
import M from "materialize-css"
import { useNavigate } from 'react-router-dom';


function RegisterComponent() {
const navigate=useNavigate();
const [employeeName,setEmployeeName]=useState();
const [phoneNumber,setPhoneNumber]=useState();
const [email,setEmail]=useState();
const [jobPosition,setJobPosition]=useState();
const [password,setPassword]=useState();

const addEmployee =() => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    toast.error("Invalid email address");
    return;
  }
  fetch('http://localhost:5000/api/employee/addEmployee',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":"Bearer "+localStorage.getItem("jwt")
  },
    body: JSON.stringify({
      employeeName,
      phoneNumber,
      email,
      jobPosition,
      password,
    })
  }).then(response => response.json())
   .then(data=>{
    if (data.error) {
      toast.error(data.error)
    }else{
      toast.success(data.message)
      navigate('/users')
    };
   }).catch(err => {
    console.log(err);
   });

};

  return (
<div className="App">
       <main style={{ marginTop: 58 }}>
       <section className="mb-4">
        <div className="card">
          <div className="card-header text-center py-3">
            <h5 className="mb-0 text-center main-title">
              <strong>Register Users</strong>
            </h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
    <section>
        <div className="row">
          <div className="col-xl-5 col-sm-6 col-12 mb-4 tiket-card">
            <div className="card">
              <div className="card-body ">
                <div className="d-flex justify-content-center">
                <div className="text-end">
                    <p className="mb-0 text-title">Register User</p>
                  </div>

                </div>
                <div  >
                <MDBCol>
                <MDBInput wrapperClass='mb-4'className='text-groub' value={employeeName} onChange={(e)=>setEmployeeName(e.target.value)} label='Name' id='formControlLg' type='text' size="lg"/>
                <MDBInput wrapperClass='mb-4'className='text-groub'value={phoneNumber}  onChange={(e)=>setPhoneNumber(e.target.value)} label='Phone Number' id='formControlLg' type='text' size="lg"/>
                <MDBInput wrapperClass='mb-4'className='text-groub' value={jobPosition}  onChange={(e)=>setJobPosition(e.target.value)} label='JobPosition' id='formControlLg' type='text' size="lg"/>
                <MDBInput wrapperClass='mb-4'className='text-groub' value={email}        onChange={(e)=>setEmail(e.target.value)} label='Email address' id='formControlLg' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4'className='text-groub'value={password}     onChange={(e)=>setPassword(e.target.value)}label='Password' id='formControlLg' type='password' size="lg"/>
               <button className="mb-4 w-100 button"onClick={()=>addEmployee()} size="lg">Register</button>
              </MDBCol>
              </div>
              </div>
            </div>
          </div>
          </div>

      </section>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
  </main>
    </div>


  );
}

export default RegisterComponent;
