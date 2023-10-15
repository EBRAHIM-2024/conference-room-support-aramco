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
       <section className="mb-4">
        <div className="card">
          <div className="card-header text-center py-3">
            <h5 className="mb-0 text-center">
              <strong>Register Section</strong>
            </h5>
          </div>
      <section>
        <div className="row">
          <div className="col-xl-6 col-sm-6 col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between px-md-1">
                <div className="text-end">
                    <p className="mb-0">Add Bulding</p>
                  </div>
                  <div className="align-self-center">
                    <i className="fas fa-pencil-alt text-info fa-3x" />
                  </div>
                </div>
                <div  >
                <MDBCol style={{ marginTop: 10 }}>
                <MDBInput wrapperClass='mb-4' value={buildingName} label='Bulding Name'onChange={(e)=>setBuildingName(e.target.value)} id='formControlLg' type='text' size="lg"/>
               <MDBBtn className="mb-4 w-100" size="lg" onClick={()=>addBuilding()}>Add</MDBBtn>
              </MDBCol>
              </div>

              </div>
            </div>
          </div>
          <div className="col-xl-6 col-sm-6 col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between px-md-1">
                <div className="text-end">
                    <p className="mb-0">Add Room</p>
                  </div>
                  <div className="align-self-center">
                  <i className="fas fa-pencil-alt text-info fa-3x" />
                  </div>
                </div>
                <MDBCol style={{ marginTop: 10 }}>
                <MDBInput wrapperClass='mb-4' onChange={(e)=>setRoomName(e.target.value)}label='Room Name' id='formControlLg' type='text' size="lg"/>
                <select  id="select1"className="mb-4 w-100"onChange={(e)=>setBuilding(e.target.value)}>
               <option className='select' >Select Building</option>
                  {buildings.map(data=>{
                       return(
                        <option value={data._id}>{data.buildingName}</option>
                       )
                    })}
                 </select>
               <select  id="select1"className="mb-4 w-100"onChange={(e)=>setEmployee(e.target.value)}>
               <option className='select' >Select Employee</option>
                  {employees.map(data=>{
                       return(
                        <option value={data._id}>{data.employeeName}</option>
                       )
                    })}
                 </select>
               <select  id="select1"className="mb-4 w-100"onChange={(e)=>setInspector(e.target.value)}>
               <option className='select' >Select Isnpector</option>
                  {isnpectors.map(data=>{
                       return(
                        <option value={data._id}>{data.inspector}</option>
                       )
                    })}
                 </select>
               <MDBBtn className="mb-4 w-100" size="lg"onClick={()=>addRoom()}>Add</MDBBtn>
              </MDBCol>

              </div>
            </div>
          </div>

          <div className="col-xl-6 col-sm-6 col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between px-md-1">
                <div className="text-end">
                    <p className="mb-0">Add Isnpectors</p>
                  </div>
                  <div className="align-self-center">
                  <i className="fas fa-pencil-alt text-info fa-3x" />
                  </div>
                </div>
                <MDBCol style={{ marginTop: 10 }}>
                <MDBInput wrapperClass='mb-4'  onChange={(e)=>setInspector(e.target.value)}label='name' id='formControlLg' type='text' size="lg"/>
                <MDBInput wrapperClass='mb-4'  onChange={(e)=>setPhoneNumber(e.target.value)}label='phone Number' id='formControlLg' type='text' size="lg"/>
               <MDBInput wrapperClass='mb-4'   onChange={(e)=>setEmail(e.target.value)}label='email' id='formControlLg' type='email' size="lg"/>
               <MDBBtn className="mb-4 w-100" size="lg"onClick={()=>addIsnpector()}>Add</MDBBtn>
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
