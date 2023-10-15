import React, { useEffect, useState } from 'react';



const ActionScreen=()=>{
    const [buildings,setBuldings]=useState([]);
    const [rooms,setRooms]=useState([]);
    const [tikets,setTikets]=useState([]);


    useEffect(()=>{
        fetch('http://localhost:5000/api/employee/getBuldings',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setBuldings(result);
            console.log(result);
        })
     },[])
     useEffect(()=>{
        fetch('http://localhost:5000/api/employee/getRooms',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setRooms(result);
            console.log(result);
        })
     },[])
     useEffect(()=>{
        fetch('http://localhost:5000/api/employee/getTikets',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setTikets(result);
            console.log(result);
        })
     },[])
   return(
    <section>
        <div className="row">
          <div className="col-xl-6 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <i className="fas fa-pencil-alt text-info fa-3x me-4" />
                    </div>
                    <div>
                      <h4>Total Posts</h4>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <h2 className="h1 mb-0">{rooms.length+buildings.length+tikets.length}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <i className="far fa-comment-alt text-warning fa-3x me-4" />
                    </div>
                    <div>
                      <h4>Total Requests</h4>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <h2 className="h1 mb-0">{tikets.length}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <i className="fa-solid fa-people-roof text-info fa-3x me-4" />
                    </div>
                    <div>
                      <h4>Total Rooms</h4>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <h2 className="h1 mb-0">{rooms.length}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <i className="fa-solid fa-building text-success fa-3x me-4" />
                    </div>
                    <div>
                      <h4>Total Buildings</h4>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <h2 className="h1 mb-0">{buildings.length}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


   )
}
export default ActionScreen;