import React from 'react';
import { useEffect, useState } from 'react';
import ChartComponent from './chart';
import ActionScreen from './actionsScreen';



function HomeComponent() {
  const [tikets,setTikets]=useState([]);

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
  return (
    <div className="App">
     <main style={{ marginTop: 58 }}>
    <div className="container pt-4">
      {/* Section: Main chart */}
      <section className="mb-4">
        <div className="card">
          <div className="card-header py-3">
            <h5 className="mb-0 text-center">
              <strong>chart</strong>
            </h5>
          </div>
          <div className="card-body">
          <div className="table-responsive">

            <ChartComponent/>
            {/* <canvas className="my-4 w-100" id="myChart" height={380} /> */}
          </div>
          </div>
        </div>
      </section>

    {/* Section: Main chart */}

      {/*Section: Request */}
      <section className="mb-4">
        <div className="card">
          <div className="card-header text-center py-3">
            <h5 className="mb-0 text-center">
              <strong>Requests</strong>
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
                        </tr>

                        )
                    })}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <ActionScreen/>
    </div>
  </main>
    </div>
  );
}

export default HomeComponent;
