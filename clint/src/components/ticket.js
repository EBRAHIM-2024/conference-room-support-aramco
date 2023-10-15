import { MDBBtn, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import { useParams } from 'react-router-dom';


function TicketComponent() {
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState(false);
  const [DD1, setDD1] = useState([]);
  const [DD2, setDD2] = useState([]);
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [phoneNumber,setPhoneNumber]=useState();
  const [building,setBulding]=useState();
  const [employee,setEmployee]=useState();
  const [employeePhone,setEmployeePhone]=useState();
  const [inspector,setInspector]=useState();
  const [inspectorPhone,setInspectorPhone]=useState();
  const {roomID}=useParams();
  const [room,setRoom]=useState();
  const [problem,setProblem]=useState();
  const [body,setBody]=useState();
  const [to,setTo]=useState();

  useEffect(() => { }, [DD2]);

  const dd_data_1 = ["Select issue type", "AV", "A/C","Cleaning Service","Curtains","Electricity","Other"];
  const dd_data_2 = [{name: "AV", content: "Projecter is not working"}, {name: "AV", content: "cannot connect to the proector"},
                     {name: "A/C", content: "Cold"}, {name: "A/C", content: "Hot"},
                     {name: "Cleaning Service", content: "Room Smells"},{name: "Cleaning Service", content: "Room Is Dirty"},
                     {name: "Electricity", content: "Light is not working"}, {name: "AElectricity", content: "No power in outlet"},{name: "Electricity", content: "outlet wires is exposed"},
                     {name: "Curtains", content: "Curtains is not working"},
                     {name: "Other"}];


 const handelChange= (e) => {
  let foo = dd_data_2.filter(x => x.name === e.target.value);
   if ((e.target.value === "Other")) {
   setShow(true);
   }else if (e.target.value === "AV","AC","Cleaning Service","Curtains","Electricity") {
    setSelect(true);
    setShow(false);
   }else{
    setShow(false);
   }
    setDD2(foo);
 };




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
     setBulding(result.response.building.buildingName)
     setEmployee(result.response.employee.employeeName)
     setEmployeePhone(result.response.employee.phoneNumber)
     setInspector(result.response.inspector.inspector)
     setInspectorPhone(result.response.inspector.phoneNumber)



 })

},[])


  const CreatTiket =() => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      toast.error("Invalid email address")
      return;
    }
    fetch('http://localhost:5000/api/employee/addTiket',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
        building,
        room,
        problem,
        employee,
        inspector,
      })
    }).then(response => response.json())
     .then(data=>{
      if (data.error) {
        toast.error(data.error)
      }else{
      toast.success(data.message)
       console.log(data);
      };
     }).catch(err => {
      console.log(err);
     });

      fetch('http://localhost:5000/send-sms',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          body:`please cheack  Room ${room} it has  a problem`,
          to:`whatsapp:+966${inspectorPhone,employeePhone}`
        })
      }).then(response => response.json())
       .then(data=>{
        console.log(data);
        if (data.error) {
          //we should put alert here --------
         console.log(data.error);
        }
        else{
          console.log(data);

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
              <strong>Ticket</strong>
            </h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
    <section>
        <div className="row">
          <div className="col-xl-4 col-sm-6 col-12 mb-4 tiket-card">
            <div className="card">
              <div className="card-body ">
                <div className="d-flex justify-content-between px-md-1">
                <div className="text-end">
                    <p className="mb-0">Add Ticket</p>
                  </div>
                  <div className="align-self-center">
                    <i className="fa-solid fa-ticket text-primary fa-3x" />
                  </div>
                </div>
                <div>
                <MDBCol style={{ marginTop: 10 }}>
                <div className="row">
                <div class="col-sm">
                <MDBInput wrapperClass='mb-4'value={room} onChange={(e)=>setRoom(e.target.value)} label='Room' id='formControlLg' type='text' size="lg"/>
                </div>
                <div class="col-sm">
                <MDBInput wrapperClass='mb-4'value={building} onChange={(e)=>setBulding(e.target.value)} label='Bulding' id='formControlLg' type='text' size="lg"/>
                </div>
                </div>
                <div className="row" hidden>
                <div class="col-sm">
                <MDBInput wrapperClass='mb-4'value={employee} onChange={(e)=>setEmployee(e.target.value)} label='Employee' id='formControlLg' type='text' size="lg"/>
                </div>
                <div class="col-sm">
                <MDBInput wrapperClass='mb-4'value={employeePhone} label='Mobile' id='formControlLg' type='text' size="lg"/>
                </div>
                </div>
                <div className="row" hidden>
                <div class="col-sm">
                <MDBInput wrapperClass='mb-4'value={inspector} onChange={(e)=>setInspector(e.target.value)} label='Inspector' id='formControlLg' type='text' size="lg"/>
                </div>
                <div class="col-sm">
                <MDBInput wrapperClass='mb-4'value={inspectorPhone} label='Mobile' id='formControlLg' type='text' size="lg"/>
                </div>
                </div>

                <div className="row" hidden>
                <div class="col-sm">
                <MDBInput wrapperClass='mb-4'value={body} onChange={(e)=>setBody(e.target.value)} label='SMS' id='formControlLg' type='text' size="lg"/>
                </div>
                <div class="col-sm">
                <MDBInput wrapperClass='mb-4'value={to} onChange={(e)=>setTo(e.target.value)} label='Mobile' id='formControlLg' type='text' size="lg"/>
                </div>
                </div>
                <MDBInput wrapperClass='mb-4'value={name} onChange={(e)=>setName(e.target.value)} label='Name' id='formControlLg' type='text' size="lg"/>
                <MDBInput wrapperClass='mb-4'value={email} onChange={(e)=>setEmail(e.target.value)}label='Email address' id='formControlLg' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4'value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} label='Phone Number' id='formControlLg' type='text' size="lg"/>
                <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12">
                <select name="dd_1" id="dd_1" onChange={handelChange}className="mb-4 w-100 input" >
                     <option value=""></option>
                     {dd_data_1.map((x, i) => (
                    <option key={i} value={x}>{x}</option>
                    ))}
                 </select>

                {select?
                <select name="dd_2" id="dd_2" className="mb-4 w-100 input"onChange={(e)=>setProblem(e.target.value)} >
                <option value="">Select specific issue</option>
                {DD2.map((x, i) => (
                    <option key={x.content} value={x.content}>{x.content}</option>
                    ))}
                 </select>:null}
                  {show?<textarea class="textinput" id="query"className="mb-4 w-100" name="query" placeholder="Please enter your query..." onChange={(e)=>setProblem(e.target.value)}></textarea>:null}
                </div>
               <MDBBtn className="mb-4 w-100" size="lg"onClick={()=>CreatTiket()}>Send</MDBBtn>

              </MDBCol>
              </div>

              </div>
            </div>
          </div>
          </div>

      </section>
            </div>
          </div>
        </div>
      </section>
  </main>
  <ToastContainer/>
    </div>


  );
}

export default TicketComponent;



// className='d-none'