import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Hospital</Link>
       
         
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/Register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/Login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/AdminLogin">Admin</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;
