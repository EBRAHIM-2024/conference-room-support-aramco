import { toast } from 'materialize-css';
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';

function OrdersComponent() {
   const [tikets,setTikets]=useState([]);
  const  [isReload, setIsReload]= useState(true);

  useEffect(()=>{
    fetch('https://conference-room-support-app-server.onrender.com/api/employee/getTikets',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result);
        setTikets(result);
        setIsReload(!isReload);
        console.log(result);
    })
 },[isReload])
  const removeTiket= (tiketID)=>{
        fetch(`https://conference-room-support-app-server.onrender.com/api/employee/deleteTiket/${tiketID}/`,{
            method:"POST",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
          console.log(result);
            const newTikets = tikets.filter(item=>{
                return item._id !== result._id

            })
            setTikets(newTikets);
            setIsReload(!isReload);
            toast.success("Tiket deleted successfully")
        })


    }
  return (
    <div className="App">
       <main style={{ marginTop: 58 }}>
       <section className="mb-4"style={{marginRight:10,marginLeft:10}}>
        <div className="card">
          <div className="card-header text-center py-3">
            <h5 className="mb-0 text-center">
              <strong>Orders</strong>
            </h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Inspector</th>
                    <th scope="col">Building</th>
                    <th scope="col">Converance Room</th>
                    <th scope="col">Problem</th>
                    <th scope="col">Date</th>
                    <th scope="col">Remove</th>

                  </tr>
                </thead>
                <tbody>
                {tikets.map((data,i)=>{
                       return(
                        <tr key={data._id}>
                        <td>{i+1}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.phoneNumber}</td>
                        <td>{data.employee}</td>
                        <td>{data.inspector}</td>
                        <td>{data.building}</td>
                        <td>{data.room}</td>
                        <td>{data.problem}</td>
                        <td>{data.createdAt}</td>
                        <td><i className="fa-solid fa-trash text-danger icon-c" onClick={()=>removeTiket(data._id)} /></td>
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
    </div>
  );
}

export default OrdersComponent;
