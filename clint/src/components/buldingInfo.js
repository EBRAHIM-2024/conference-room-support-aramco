import React, { useEffect, useState } from 'react';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


function BuldingComponent() {
    const [buildings,setBuildings]=useState([]);
    const [isReload, setIsReload]= useState(true);


    useEffect(()=>{
      fetch('http://localhost:5000/api/employee/getBuldings',{
          headers:{
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          console.log(result);
          setBuildings(result);
          console.log(result);
      })
   },[isReload])

      const removeBulding = (buildingID)=>{
        fetch(`http://localhost:5000/api/employee/deleteBuilding/${buildingID}/`,{
            method:"POST",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = buildings.filter(item=>{
                return item._id !== result._id
            })
            setBuildings(newData)
            setIsReload(!isReload);
            toast.success("Building deleted successfully")
        })
    }

    return (
      <div className="App">
          <main style={{ marginTop: 58 }}>
         <section className="mb-4"style={{marginRight:10,marginLeft:10}}>
          <div className="card">
            <div className="card-header text-center py-3">
              <h5 className="mb-0 text-center">

                <strong>Buldings</strong>
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                    <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      {/* <th scope="col" className='text-info'>Show</th> */}
                      <th scope="col" className='text-success'>Edit</th>
                      <th scope="col" className='text-danger'>Delete</th>





                    </tr>
                  </thead>
                  <tbody>
                  {buildings.map((data,i)=>{
                       return(
                      <tr key={i}>
                      <td>{i+1}</td>
                      <td>{data.buildingName}</td>
                      <td><Link to={`/editBulding/${data._id}`}>
                      <i className="fa-solid fa-pen-to-square text-success  icon-c " />
                      </Link></td>
                      <td><i className="fa-solid fa-trash text-danger icon-c" onClick={()=>removeBulding(data._id)} /></td>
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

export default BuldingComponent;