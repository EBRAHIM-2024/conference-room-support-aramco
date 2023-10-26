
import React, { useEffect, useState } from 'react';
import '../App.css';
import { MDBInput } from 'mdb-react-ui-kit';
import {useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditEmployee(props) {
  const navigate=useNavigate();
  const {employeeID}=useParams();
  const [employeeName,setEmployeeName]=useState();
  const [phoneNumber,setPhoneNumber]=useState();
  const [email,setEmail]=useState();
  const [jobPosition,setJobPosition]=useState();

  useEffect(()=>{
    fetch(`https://conference-room-support-app-server.onrender.com/api/employee/getEmployeeById/${employeeID}/`,{
      method:"POST",
      headers:{
          Authorization:"Bearer "+localStorage.getItem("jwt")
      }
  }).then(res=>res.json())
  .then(result=>{
      console.log(result.response)
      setEmployeeName(result.response.employeeName)
      setEmail(result.response.email)
      setPhoneNumber(result.response.phoneNumber)
      setJobPosition(result.response.jobPosition)

  })

 },[])
  const updateEmployee=(e)=>{
    //  e.prefentDufult();
    fetch(`https://conference-room-support-app-server.onrender.com/api/employee/updateEmployee/${employeeID}/`,{
      method:"POST",
      headers:{
         'Content-Type': 'application/json',
          Authorization:"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        employeeName,
        phoneNumber,
        email,
        jobPosition,
      })
  }).then(res=>res.json())
  .then(result=>{
      toast.success("user updated successfully")
      console.log(result)
      navigate('/users')

  }).catch(err=>{
    toast.error(err.message)
    console.log(err.message);
  })
  }
  return (
    <main style={{ marginTop: 58 }}>

    <section>
    <div className="row">
    <div className="col-xl-12 col-sm-12 col-12 mb-4">
    <div className="card">
    <div className="card-body">

    <div class="row ">
  <div class="col-sm">
  <MDBInput wrapperClass='mb-4'value={employeeName} onChange={(e)=>setEmployeeName(e.target.value)} id='formControlLg' type='text' size="lg"/>
  </div>
  <div class="col-sm">
  <MDBInput wrapperClass='mb-4'value={email} id='formControlLg' type='email' size="lg"/>
  </div>
  <div class="col-sm">
  <MDBInput wrapperClass='mb-4'value={phoneNumber} id='formControlLg' type='email' size="lg"/>
  </div>
  <div class="col-sm">
  <MDBInput wrapperClass='mb-4'value={jobPosition} id='formControlLg' type='email' size="lg"/>
  </div>
  <div class="col-sm">
  <i className="fa-solid fa-pen-to-square text-success icon-p icon-c"  onClick={()=>updateEmployee(employeeID)}
 />
  </div>
  </div>
    </div>
    </div>
    </div>
    </div>

    </section>
    <ToastContainer/>
    </main>
  );
}

export default EditEmployee;



