import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import React, { useContext } from 'react';
import { UserContext } from '../App';

const Navigation = () => {
  const navigate =useNavigate();
  const {state,dispatch} = useContext(UserContext)
  const user = JSON.parse(localStorage.getItem("user"))


    return (
      <>
      <>
  {/*Main Navigation*/}
  <header>
    {/* Sidebar */}

    <nav
      id="sidebarMenu"
      className="collapse d-lg-block sidebar collapse bg-white"
    >
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <Link to="home" className="list-group-item list-group-item-action py-2 ripple active"
            aria-current="true">
            <i className="fas fa-tachometer-alt fa-fw me-3" />
            <span>Main Dashboard</span>
          </Link>


          <Link to="orders"className="list-group-item list-group-item-action py-2 ripple">
            <i className="fa-solid fa-pencil  me-3" />
            <span>Orders</span>
          </Link>

          <Link to="tiket"className="list-group-item list-group-item-action py-2 ripple">
            <i className="fa-solid fa-ticket me-3" />
            <span>Ticket</span>
          </Link>


          <Link to="users"className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-users fa-fw me-3" />
            <span>Users</span>
          </Link>

          <Link to="/info"className="list-group-item list-group-item-action py-2 ripple">
            <i className="fa-solid fa-circle-info fa-fw me-3" />
            <span>Info</span>
          </Link>

          <Link to="sinUp" className="list-group-item list-group-item-action py-2 ripple">
            <i className="fas fa-users fa-fw me-3" />
            <span>Register Users</span>
          </Link>
          <Link to="settings"className="list-group-item list-group-item-action py-2 ripple">
            <i className="fa-solid fa-gear me-3" />
            <span>Settings</span>
          </Link>
          <Link className="list-group-item list-group-item-action py-2  active">
            <i class="fa-solid fa-right-from-bracket me-3"></i>
            <span
            onClick={()=>{
              localStorage.clear();
              dispatch({type:"CLEAR",})
              navigate('/login')
            }}

            >Logout</span>
          </Link>

        </div>
      </div>
    </nav>
    {/* Sidebar */}
    {/* Navbar */}
    <nav
      id="main-navbar"
      className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
    >
      {/* Container wrapper */}
      <div className="container-fluid">
        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" />
        </button>
        {/* Brand */}
        <Link to={state?"/home":"/login"}  className="navbar-brand" >
        <img
            src={logo}
            height={25}
            alt=""
            loading="lazy"
          />
          </Link>


        {/* Search form */}
        <form className="d-none d-md-flex input-group w-auto my-auto">
          <input
            autoComplete="off"
            type="search"
            className="form-control rounded"
            placeholder=''
            style={{ minWidth: 225 }}
          />
          <span className="input-group-text border-0">
            <i className="fas fa-search" />
          </span>
        </form>
        {/* Right links */}
        <ul className="navbar-nav ms-auto d-flex flex-row">
          {/* Notification dropdown */}
          <li className="nav-item dropdown">
            <a
              className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i />
              <li>
                <h5>Welcome:{state?state.employeeName:"loading"}</h5>
              </li>

            </a>

          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-bell" />
              <span className="badge rounded-pill badge-notification bg-danger">
                1
              </span>
            </a>

          </li>

        </ul>
      </div>

    </nav>
  </header>
</>

      <Outlet />
    </>
  );
};



export default Navigation;


{/* <a
href="#"
className="list-group-item list-group-item-action py-2 ripple active"
>
<i className="fas fa-chart-area fa-fw me-3" />
<span>Home</span>
</a> */}
