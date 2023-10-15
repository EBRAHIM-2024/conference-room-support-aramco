
import React, { useEffect, useState } from 'react';
import '../App.css';
import { MDBInput } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate, useParams } from 'react-router-dom';

function EditBulding(props) {
  const navigate=useNavigate();
  const {buildingID}=useParams();
  const [buildingName,setName]=useState();


  useEffect(()=>{
    fetch(`http://localhost:5000/api/employee/getBuldingByID/${buildingID}/`,{
      method:"POST",
      headers:{
          Authorization:"Bearer "+localStorage.getItem("jwt")
      }
  }).then(res=>res.json())
  .then(result=>{
      console.log(result.response)
      setName(result.response.buildingName)


  })

 },[])
  const updateBulding=(e)=>{
    //  e.prefentDufult();
    fetch(`http://localhost:5000/api/employee/updateBuilding/${buildingID}/`,{
      method:"POST",
      headers:{
         'Content-Type': 'application/json',
          Authorization:"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        buildingName,
      })
  }).then(res=>res.json())
  .then(result=>{
     toast.success(result.message);
      console.log(result.message)
      navigate('/settings')
  }).catch(err=>{
    toast.error(err.message)

  })
  }
  return (

    <main style={{ marginTop: 58 }}>
    <ToastContainer/>
    <section>
    <div className="row">
    <div className="col-xl-12 col-sm-12 col-12 mb-4">
    <div className="card">
    <div className="card-body">

    <div class="row ">
  <div class="col-sm">
  <MDBInput wrapperClass='mb-4'value={buildingName} onChange={(e)=>setName(e.target.value)} id='formControlLg' type='text' size="lg"/>
  </div>
  <div class="col-sm">
  <i className="fa-solid fa-pen-to-square text-success icon-p icon-c"  onClick={()=>updateBulding(buildingID)}
 />
  </div>
  </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    </main>

  );
}

export default EditBulding;



