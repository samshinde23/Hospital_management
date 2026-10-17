import React from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("auth"); // Clear authentication token
    navigate("/"); // Redirect to home page or login page
  }

  function handleDoctorDetails() {
    navigate("/DoctorDetails");
  }

  function handlePatientDetails() {
    navigate("/PatientDetails"); 
  }

  function handlePostOperation() {
    navigate("/PostOperation"); 
  }

  function handleRegisteredUser() {
    navigate("/RegisteredUser"); 
  }


 
  return (
    <div className="container login-container">
      <h1 style={{ textAlign: "center" }}>Menu</h1>
    <ul style={{ marginLeft: "500px" }}>
        <li>
      {/* Donate button */}
      <button onClick={handleDoctorDetails} className="reg_btn" style={{ marginTop: "10px", height: "100px", width:"200px", marginLeft:"400px"}}>
        Doctor details
      </button>
      </li>

      {/* Payment History button */}
      
      <li>
      <button onClick={handlePatientDetails} className="reg_btn" style={{ marginTop: "10px", height: "100px", width:"200px", marginLeft:"400px" }}>
        Patient details
      </button>
      </li>

      <li>
      <button onClick={handlePostOperation} className="reg_btn" style={{ marginTop: "10px", height: "100px", width:"200px", marginLeft:"400px",}}>
        Post operation
      </button>
      </li>

      <li>
      <button onClick={handleRegisteredUser} className="reg_btn" style={{ marginTop: "10px", height: "100px", width:"200px", marginRight:"400px"}}>
        Registered Users
      </button>
      </li>

    <li>
      {/* Logout button */}
      <button onClick={handleLogout} className="reg_btn" style={{ marginTop: "10px", height: "100px", width:"200px",marginRight:"400px"}}>
        Logout
      </button>
      </li>
      </ul>
    </div>
  );
}

export default Menu;
