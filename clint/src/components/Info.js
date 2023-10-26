import { MDBBtn, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import '../App.css';
import BuldingComponent from './buldingInfo';
import RoomComponent from './roomInfo';

function InfoComponent() {
  useEffect(()=>{
    fetch('https://conference-room-support-app-server.onrender.com/api/employee/getBuldings',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result);
    })
 },[])
  return (
    <div className="App">
      <BuldingComponent/>
      <RoomComponent/>
    </div>
  );
}

export default InfoComponent;
