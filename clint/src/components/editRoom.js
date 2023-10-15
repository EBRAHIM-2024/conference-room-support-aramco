
import React, { useEffect, useState } from 'react';
import '../App.css';
import { MDBInput } from 'mdb-react-ui-kit';
import {useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditRoom(props) {
  const navigate=useNavigate();
  const {roomID}=useParams();
  const [room,setRoom]=useState();


  useEffect(()=>{
    fetch(`http://localhost:5000/api/employee/getRoomByID/${roomID}/`,{
      method:"POST",
      headers:{
          Authorization:"Bearer "+localStorage.getItem("jwt")
      }
  }).then(res=>res.json())
  .then(result=>{
      console.log(result.response)
      setRoom(result.response.roomName)


  })

 },[])
  const updateRoom=(e)=>{
    //  e.prefentDufult();
    fetch(`http://localhost:5000/api/employee/updateRoom/${roomID}/`,{
      method:"POST",
      headers:{
         'Content-Type': 'application/json',
          Authorization:"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        room,
      })
  }).then(res=>res.json())
  .then(result=>{
     toast.success("Room updated successfully")
      navigate('/settings')
      // setEmployeeName(location.state.data.employeeName)


  }).catch(err=>{
    toast(err.message)
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
  <MDBInput wrapperClass='mb-4'value={room} onChange={(e)=>setRoom(e.target.value)} id='formControlLg' type='text' size="lg"/>
  </div>
  <div class="col-sm">
  <i className="fa-solid fa-pen-to-square text-success icon-p icon-c"  onClick={()=>updateRoom(roomID)}
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

export default EditRoom;



