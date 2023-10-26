import React, { useState,useContext } from 'react';
import {MDBContainer,MDBCol,MDBRow,MDBBtn,MDBInput,MDBCheckbox}from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import "../App.css"
import logo from '../assets/images/logo.png';
import loginImg from '../assets/images/login.png';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function LoginComponent() {
const {state,dispatch} = useContext(UserContext)
const navigate=useNavigate();
const [email,setEmail]=useState();
const [password,setPassword]=useState();

  const login =() => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      // Should  but alert Here
      toast.error("Invalid email address")
      return;
    }
    fetch('http://localhost:5000/api/employee/signIn',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password,
      })
    }).then(response => response.json())
     .then(data=>{
      console.log(data);
      if (data.error) {
      toast.error(data.error)
       console.log(data.error);
      }else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
       //we should put alert here --------
       navigate('/')
       toast.success("You have successfully Logged in!")
      };
     }).catch(err => {
      console.log(err);
     });

  };
  return (
    <div className="App">
      <div className='continer-login'>
     <img className="login-img"src={loginImg} width={120} class="img-fluid" alt="Phone image" />
      <MDBRow style={{marginTop:20}}>
        <MDBCol col='4' md='6'>
          <img src={logo} width={500} class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='4'style={{marginTop:10,padding:30}}>
        <MDBInput className='text-groub' wrapperClass='mb-4' value={email}    onChange={(e)=>setEmail(e.target.value)} label='Email address' id='formControlLg' type='email' size="lg"/>
        <MDBInput className='text-groub' wrapperClass='mb-4' value={password} onChange={(e)=>setPassword(e.target.value)} label='Password' id='formControlLg' type='password' size="lg"/>


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox  name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a className='text-groub' href="!#">Forgot password?</a>
          </div>

          <button className="mb-4 w-100 button" onClick={()=>login()}size="lg">Sign in</button>


        </MDBCol>

      </MDBRow>
      <ToastContainer/>
    </div>
      {/* <main style={{marginTop:100 }}>
   <section className="mb-4">

    <MDBContainer fluid className="p-5 my-5 ">
      <MDBRow>
        <MDBCol col='4' md='6'>
          <img src={logo} width={500} class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='4'style={{padding:15}}>
        <MDBInput wrapperClass='mb-4' value={email}    onChange={(e)=>setEmail(e.target.value)} label='Email address' id='formControlLg' type='email' size="lg"/>
        <MDBInput wrapperClass='mb-4' value={password} onChange={(e)=>setPassword(e.target.value)} label='password' id='formControlLg' type='password' size="lg"/>


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" onClick={()=>login()}size="lg">Sign in</MDBBtn>


        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </section>
    </main> */}
    </div>
  );
}

export default LoginComponent;