import React, { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"
import { Link } from 'react-router-dom';
function UsersComponent() {
  const [users,setUsers]=useState([]);
  const [isReload, setIsReload]= useState(true);

  useEffect(()=>{
    fetch('http://localhost:5000/api/employee/getEmployees',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result);
        setUsers(result);
        console.log(result);
    })
 },[isReload])

    const remove = (employeeID)=>{
      fetch(`http://localhost:5000/api/employee/deletEmployee/${employeeID}/`,{
          method:"POST",
          headers:{
              Authorization:"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          console.log(result)
          const newData = users.filter(item=>{
              return item._id !== result._id
          })
          setUsers(newData)
          setIsReload(!isReload);
          toast.success("Employee deleted successfully")
      })
  }

  return (
    <div className="App">
        <main style={{ marginTop: 58 }}>
     <section className="mb-4">
        <div className="card">
          <div className="card-header text-center py-3">
            <h5 className="mb-0 text-center">

              <strong>Users</strong>
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
                    <th scope="col">JobPosition</th>
                    {/* <th scope="col" className='text-info'>Show</th> */}
                    <th scope="col" className='text-success'>Edit</th>
                    <th scope="col" className='text-danger'>Delete</th>





                  </tr>
                </thead>
                <tbody>
                  {users.map(data=>{
                     return(
                    <tr key={data._id}>
                    <th>{data._id}</th>
                    <td>{data.employeeName}</td>
                    <td>{data.email}</td>
                    <td>{data.phoneNumber}</td>
                    <td>{data.jobPosition}</td>
                    <td><Link to={`/editEmployee/${data._id}`}>
                    <i className="fa-solid fa-pen-to-square text-success  icon-c " />
                    </Link></td>
                    <td><i className="fa-solid fa-trash text-danger icon-c" onClick={()=>remove(data._id)} /></td>
                    {/* <td><i className="fa-solid fa-eye text-info icon-c"    onClick={()=>getEmployee(data._id)}  /></td> */}
                  </tr>
                     )
                  })}

                  <tr>
                  </tr>
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

export default UsersComponent;

