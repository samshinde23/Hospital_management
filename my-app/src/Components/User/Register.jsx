import React, { useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

function Register() {
  const [user, setUser] = useState({
    FirstName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    // Ensure phone number only contains digits and is max 10 characters
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setUser((prev) => ({ ...prev, [name]: value }));
  }

  async function handleClick(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    if (user.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/Register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Registration successful:", responseData);
        setUser({ FirstName: "", email: "", password: "", phone: "" });
        setSuccess(true);
        setError(null);
      } else {
        console.error("Error from server:", responseData);
        setError(`Failed to register: ${responseData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to connect to backend server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="icon-circle" style={{ background: "#dcfce7", color: "#16a34a" }}>
            <i className="fas fa-user-plus"></i>
          </div>
          <h2 className="auth-title">Patient Sign Up</h2>
          <p className="auth-subtitle">Create your personal account to manage healthcare records</p>
        </div>

        {error && (
          <div className="alert-modern alert-danger-modern mb-3">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert-modern alert-success-modern mb-3">
            <i className="fas fa-check-circle"></i>
            <span>Registration successful! You can now log in.</span>
          </div>
        )}

        <form onSubmit={handleClick}>
          <div className="form-group-modern">
            <label className="form-label-modern" htmlFor="FirstName">Full Name</label>
            <input
              id="FirstName"
              onChange={handleChange}
              type="text"
              name="FirstName"
              className="form-control-modern"
              placeholder="e.g. John Doe"
              value={user.FirstName}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern" htmlFor="email">Email Address</label>
            <input
              id="email"
              onChange={handleChange}
              type="email"
              name="email"
              className="form-control-modern"
              placeholder="e.g. john@example.com"
              value={user.email}
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
              placeholder="Create a secure password"
              value={user.password}
              disabled={loading}
              minLength={8}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern" htmlFor="phone">Phone Number (10 Digits)</label>
            <input
              id="phone"
              onChange={handleChange}
              type="text"
              name="phone"
              className="form-control-modern"
              placeholder="e.g. 9876543210"
              value={user.phone}
              disabled={loading}
              maxLength="10"
              required
            />
          </div>

          <button type="submit" className="btn-modern btn-modern-primary w-100 mt-2" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Submitting...
              </>
            ) : (
              <>
                <i className="fas fa-check"></i> Register Account
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top">
          <p className="text-muted small mb-0">
            Already registered?{" "}
            <Link to="/Login" className="fw-bold text-decoration-none" style={{ color: "#0284c7" }}>
              Log in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
