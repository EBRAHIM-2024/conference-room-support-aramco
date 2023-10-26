import React, { useEffect, useState } from 'react';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


function RoomComponent() {
    const [rooms,setRooms]=useState([]);
    const [isReload, setIsReload]= useState(true);
    useEffect(()=>{
      fetch('https://conference-room-support-app-server.onrender.com/api/employee/getRooms',{
          headers:{
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          console.log(result);
          setRooms(result);
      })
   },[isReload])

      const removeRoom= (roomID)=>{
        fetch(`https://conference-room-support-app-server.onrender.com/api/employee/deleteRoom/${roomID}/`,{
            method:"POST",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
          console.log(result);
            const newRooms = rooms.filter(item=>{
                return item._id !== result._id

            })
            setRooms(newRooms);
            setIsReload(!isReload);
            toast.success("Room deleted successfully")
        })


    }

    return (
      <div className="App">
          <main style={{ marginTop: 58 }}>
         <section className="mb-4"style={{marginRight:10,marginLeft:10}}>
          <div className="card">
            <div className="card-header text-center py-3">
              <h5 className="mb-0 text-center">

                <strong>Rooms</strong>
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                    <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Building</th>
                      {/* <th scope="col" className='text-info'>Show</th> */}
                      <th scope="col" className='text-success'>Edit</th>
                      <th scope="col" className='text-danger'>Delete</th>
                      <th scope="col" className='text-danger'>Ticket</th>





                    </tr>
                  </thead>
                  <tbody>
                  {rooms.map((data,i)=>{
                       return(
                      <tr key={data._id}>
                      <td>{i+1}</td>
                      <td>{data.roomName}</td>
                      <td>{data.building.buildingName}</td>
                      <td><Link to={`/editRoom/${data._id}`}>
                      <i className="fa-solid fa-pen-to-square text-success  icon-c " />
                      </Link></td>
                      <td><i className="fa-solid fa-trash text-danger icon-c" onClick={()=>removeRoom(data._id)} /></td>
                      <td><Link to={`/tiket/${data._id}`}>
                      <i className="fa-solid fa-ticket text-primary" />
                      </Link></td>
                      {/* <td><i className="fa-solid fa-eye text-info icon-c"    onClick={()=>getEmployee(data._id)}  /></td> */}
                    </tr>
                       )
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
    </main>
    <ToastContainer/>
      </div>
    );
}

export default RoomComponent;