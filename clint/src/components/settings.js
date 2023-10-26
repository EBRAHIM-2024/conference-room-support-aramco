import { MDBBtn, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BuldingComponent from './buldingInfo';
import RoomComponent from './roomInfo';
import { useNavigate } from 'react-router-dom';

function SettingsComponent() {
  const navigate=useNavigate();
  const [buildings,setBuildings]=useState([]);
  const [employees,setEmployees]=useState([]);
  const [isnpectors,setInspectors]=useState([]);
  const [rooms,setRooms]=useState([]);
  const [building,setBuilding]=useState();
  const [buildingName,setBuildingName]=useState();
  const [roomName,setRoomName]=useState();
  const [employee,setEmployee]=useState();
  const [inspector,setInspector]=useState();
  const [phoneNumber,setPhoneNumber]=useState();
  const [email,setEmail]=useState();
  const [isReload, setIsReload]= useState(true);

  const addIsnpector =() => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      toast.error("Invalid email address")
      return;
    }
    fetch('http://localhost:5000/api/employee/addIsnpector',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
      body: JSON.stringify({
        inspector,
        phoneNumber,
        email
      })
    }).then(response => response.json())
     .then(data=>{
      if (data.error) {
        toast.error(data.error);
      //  console.log(data.error);
      }else{
       toast.success(data.message)
       setIsReload(!isReload);



      };
     }).catch(err => {
      console.log(err);
     });

  };


  useEffect(()=>{
    fetch('http://localhost:5000/api/employee/getIsnpectors',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        setInspectors(result);
        console.log(result);
    })
 },[isReload])

  useEffect(()=>{
    fetch('http://localhost:5000/api/employee/getEmployees',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        setEmployees(result);
        console.log(result);
    })
 },[isReload])

  useEffect(()=>{
    fetch('http://localhost:5000/api/employee/getBuldings',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        setBuildings(result);
        console.log(result);
    })
 },[isReload])
 useEffect(()=>{
  fetch('http://localhost:5000/api/employee/getRooms',{
      headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
  }).then(res=>res.json())
  .then(result=>{
      setRooms(result);
      console.log(result);
  })
},[isReload])

  const addBuilding =() => {
    fetch('http://localhost:5000/api/employee/addBuilding',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
      body: JSON.stringify({
        buildingName,
      })
    }).then(response => response.json())
     .then(data=>{
      if (data.error) {
        toast.error(data.error)
      }else{
       toast.success(data.message)
       setIsReload(!isReload);
      };
     }).catch(err => {
      console.log(err);
     });

  };


  const addRoom=() => {
    fetch('http://localhost:5000/api/employee/addRoom',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
      body: JSON.stringify({
        roomName,
        building,
        employee,
        inspector,
      })
    }).then(response => response.json())
     .then(data=>{
      if (data.error) {
        toast.error(data.error)
      }else{
        toast.success(data.message)
        setIsReload(!isReload);

      };
     }).catch(err => {
      console.log(err);
     });

  };
  return (
    <div className="App">

  <main style={{ marginTop: 58 }}>
       <section className="mb-4" style={{marginRight:10,marginLeft:10}}>
        <div className="card">
          <div className="card-header text-center py-3">
            <h5 className="mb-0 main-title">
              <strong >Register Section</strong>
            </h5>
          </div>
      <section style={{marginRight:10,marginLeft:10, marginTop:10}}>
        <div className="row">
          <div className="col-xl-6 col-sm-6 col-12 mb-4">
            <div className="card ">
              <div className="card-body">
                <div className="d-flex justify-content-center">
                <div className="text-end">
                    <p className="mb-0 text-title">Add Bulding</p>
                  </div>
                </div>
                <div  >
                <MDBCol>
                <MDBInput wrapperClass='mb-4' value={buildingName} label='Bulding Name'onChange={(e)=>setBuildingName(e.target.value)} id='formControlLg' type='text' size="lg"/>
                <button className="mb-4 w-100 button" size="lg" onClick={()=>addBuilding()}>Add</button>
                </MDBCol>
              </div>

              </div>
            </div>
          </div>
          <div className="col-xl-6 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-center">
                <div className="text-end">
                <p className="mb-0 text-title">Add Room</p>
                  </div>
                </div>
                <MDBCol>
                <MDBInput  className="input-group text-groub" wrapperClass='mb-2' onChange={(e)=>setRoomName(e.target.value)}label='Room Name' id='formControlLg' type='text' size="lg"/>
                <select  id="select1"className="mb-2 w-100 selector text-select"onChange={(e)=>setBuilding(e.target.value)}>
               <option className='text-select' >Select Building</option>
                  {buildings.map(data=>{
                       return(
                        <option value={data._id}>{data.buildingName}</option>
                       )
                    })}
                 </select>
               <select  id="select1"className="mb-2 w-100 selector text-select"onChange={(e)=>setEmployee(e.target.value)}>
               <option className='text-groub' >Select Employee</option>
                  {employees.map(data=>{
                       return(
                        <option value={data._id}>{data.employeeName}</option>
                       )
                    })}
                 </select>
               <select  id="select1"className="mb-2 w-100 selector text-select"onChange={(e)=>setInspector(e.target.value)}>
               <option className='text-groub' >Select Isnpector</option>
                  {isnpectors.map(data=>{
                       return(
                        <option value={data._id}>{data.inspector}</option>
                       )
                    })}
                 </select>
               <button className="mb-4 w-100 button" size="lg"onClick={()=>addRoom()}>Add</button>
              </MDBCol>

              </div>
            </div>
          </div>

          <div className="col-xl-6 col-sm-6 col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-center">
                <div className="text-end">
                    <p className="mb-0 text-title">Add Isnpector</p>
                  </div>
                </div>
                <MDBCol>
                <MDBInput wrapperClass='mb-2' className='text-groub'  onChange={(e)=>setInspector(e.target.value)}label='Name' id='formControlLg' type='text' size="lg"/>
                <MDBInput wrapperClass='mb-2' className='text-groub' onChange={(e)=>setPhoneNumber(e.target.value)}label='phone Number' id='formControlLg' type='text' size="lg"/>
               <MDBInput wrapperClass='mb-2'  className='text-groub' onChange={(e)=>setEmail(e.target.value)}label='Email' id='formControlLg' type='email' size="lg"/>
               <button className="mb-2 w-100 button" size="lg"onClick={()=>addIsnpector()}>Add</button>
              </MDBCol>

              </div>
            </div>
          </div>

        </div>
      </section>
        </div>
      </section>
  </main>
  <ToastContainer/>

    </div>
  );
}

export default SettingsComponent;
