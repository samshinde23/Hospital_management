import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNav = () => setIsNavCollapsed(true);

  const isAuth = !!localStorage.getItem("auth");

  const handleLogout = () => {
    localStorage.removeItem("auth");
    closeNav();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top modern-navbar">
      <div className="container">
        <Link className="brand-badge" to="/" onClick={closeNav}>
          <div className="brand-icon-box">
            <i className="fas fa-heartbeat"></i>
          </div>
          <span>MediCare HMS</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
          style={{ border: "1px solid #cbd5e1", padding: "6px 10px" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <Link
                className={`modern-nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
                onClick={closeNav}
              >
                <i className="fas fa-home me-1"></i> Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link
                className={`modern-nav-link ${location.pathname === "/Register" ? "active" : ""}`}
                to="/Register"
                onClick={closeNav}
              >
                <i className="fas fa-user-plus me-1"></i> Register
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`modern-nav-link ${location.pathname === "/Login" ? "active" : ""}`}
                to="/Login"
                onClick={closeNav}
              >
                <i className="fas fa-sign-in-alt me-1"></i> Patient Login
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`modern-nav-link ${location.pathname === "/AdminLogin" || location.pathname === "/Menu" ? "active" : ""}`}
                to="/AdminLogin"
                onClick={closeNav}
              >
                <i className="fas fa-user-shield me-1"></i> Admin Portal
              </Link>
            </li>

            {isAuth && (
              <li className="nav-item ms-lg-2">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill"
                >
                  <i className="fas fa-power-off"></i> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
