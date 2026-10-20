import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

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
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("role", "patient");
        console.log(responseData);
        navigate("/SurgicalDetails");
      } else {
        setError(responseData.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to connect to backend server");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("auth");
    navigate("/");
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="icon-circle">
            <i className="fas fa-user-lock"></i>
          </div>
          <h2 className="auth-title">Patient Portal</h2>
          <p className="auth-subtitle">Sign in to check your appointments and surgical details</p>
        </div>

        {error && (
          <div className="alert-modern alert-danger-modern mb-3">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleClick}>
          <div className="form-group-modern">
            <label className="form-label-modern" htmlFor="email">Email Address</label>
            <input
              id="email"
              onChange={handleChange}
              type="email"
              name="email"
              className="form-control-modern"
              value={credentials.email}
              placeholder="e.g. patient@example.com"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern" htmlFor="password">Password</label>
            <input
              id="password"
              onChange={handleChange}
              type="password"
              name="password"
              className="form-control-modern"
              value={credentials.password}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="btn-modern btn-modern-primary w-100 mt-2" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i> Login
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top">
          <p className="text-muted small mb-2">
            Don't have an account yet?{" "}
            <Link to="/Register" className="fw-bold text-decoration-none" style={{ color: "#0284c7" }}>
              Register Here
            </Link>
          </p>
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-link text-muted text-decoration-none mt-1"
          >
            Clear Session & Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
