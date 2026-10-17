import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  async function handleClick(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5002/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem("auth", true);
        console.log(responseData);
        navigate("/SurgicalDetails");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Failed to login");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("auth"); // Clear authentication token
    navigate("/"); // Redirect to home page or login page
  }

  return (
    <div className="container login-container" style={{ height: "400px" ,width:"430px", border:"2px solid black", textAlign: "center", marginTop:"100px",borderRadius:"20px"}}> 
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <form onSubmit={handleClick}>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={credentials.email}
          placeholder="Enter your email"
          disabled={loading} style={{ color: "red" ,width:"400px", textAlign: "center"}}
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Enter your password"
          disabled={loading} style={{ color: "red" ,width:"400px", textAlign: "center" }}
        />

        <button type="submit" className="reg_btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Logout button */}
      <button onClick={handleLogout} className="reg_btn" style={{ marginTop: "10px" }}>
        Logout
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
