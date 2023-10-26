
import React, { useEffect, useState } from 'react';
import '../App.css';
import { MDBInput } from 'mdb-react-ui-kit';
import {useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditIsnpector(props) {
  const navigate=useNavigate();
  const {isnpectorID}=useParams();
  const [inspector,setInspector]=useState();
  const [phoneNumber,setPhoneNumber]=useState();
  const [email,setEmail]=useState();

  useEffect(()=>{
    fetch(`http://localhost:5000/api/employee/getIsnpectorByID/${isnpectorID}/`,{
      method:"POST",
      headers:{
          Authorization:"Bearer "+localStorage.getItem("jwt")
      }
  }).then(res=>res.json())
  .then(result=>{
      console.log(result.response)
      setInspector(result.response.inspector)
      setPhoneNumber(result.response.phoneNumber)
      setEmail(result.response.email)
  })

 },[])
  const updateInspector=(e)=>{
    //  e.prefentDufult();
    fetch(`http://localhost:5000/api/employee/updateIsnpector/${isnpectorID}/`,{
      method:"POST",
      headers:{
         'Content-Type': 'application/json',
          Authorization:"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        inspector,
        phoneNumber,
        email,
      })
  }).then(res=>res.json())
  .then(result=>{
      toast.success( result)
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
  <MDBInput wrapperClass='mb-4'value={inspector} onChange={(e)=>setInspector(e.target.value)} id='formControlLg' type='text' size="lg"/>
  </div>
  <div class="col-sm">
  <MDBInput wrapperClass='mb-4'value={phoneNumber}onChange={(e)=>setPhoneNumber(e.target.value)} id='formControlLg' type='number' size="lg"/>
  </div>
  <div class="col-sm">
  <MDBInput wrapperClass='mb-4'value={email} onChange={(e)=>setEmail(e.target.value)} id='formControlLg' type='email' size="lg"/>
  </div>
  <div class="col-sm">
  <i className="fa-solid fa-pen-to-square text-success icon-p icon-c"  onClick={()=>updateInspector(isnpectorID)}
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

export default EditIsnpector;



