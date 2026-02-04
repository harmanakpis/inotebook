import React from 'react'
import { NavLink, Link, useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  let navigate = useNavigate();
 const handleLogout = ()=>{
  localStorage.removeItem('token');
  navigate("/login");
 }

  let location = useLocation();


  return (
   <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">iNotebook</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={location.pathname === "/" ? "nav-link active" : "nav-link"} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={location.pathname === "/about" ? "nav-link active" : "nav-link"} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?
      <form className="d-flex" role="search">
        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
      </form>: 
      <button className="btn btn-primary mx-2" onClick={handleLogout} role="button">Logout</button>
      }
      
    </div>
  </div>
</nav>
  )
}

export default Navbar
