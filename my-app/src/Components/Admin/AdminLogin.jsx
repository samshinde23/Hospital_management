import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("Sending admin login request...");

      const response = await fetch(`${API_BASE_URL}/AdminLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("role", "admin");
        navigate("/Menu");
      } else {
        throw new Error(data.error || "Invalid administrator credentials");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError(err.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: "460px" }}>
        <div className="auth-header">
          <div className="icon-circle" style={{ background: "#fef3c7", color: "#d97706" }}>
            <i className="fas fa-shield-alt"></i>
          </div>
          <h2 className="auth-title">Admin Portal</h2>
          <p className="auth-subtitle">Authorized medical staff and administrators only</p>
        </div>

        {error && (
          <div className="alert-modern alert-danger-modern mb-3">
            <i className="fas fa-exclamation-triangle"></i>
            <span>{error}</span>
          </div>
        )}

        <div className="p-3 mb-4 rounded-3 text-start small" style={{ background: "#f8fafc", border: "1px dashed #cbd5e1" }}>
          <i className="fas fa-info-circle text-primary me-2"></i>
          <strong>Default credentials:</strong> Username: <code>admin</code> | Password: <code>admin</code>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group-modern">
            <label className="form-label-modern" htmlFor="admin-username">Admin Username</label>
            <input
              id="admin-username"
              type="text"
              className="form-control-modern"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern" htmlFor="admin-password">Admin Password</label>
            <input
              id="admin-password"
              type="password"
              className="form-control-modern"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="btn-modern btn-modern-primary w-100 mt-2" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Authenticating...
              </>
            ) : (
              <>
                <i className="fas fa-lock-open"></i> Access Admin Dashboard
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top">
          <Link to="/" className="text-muted small text-decoration-none">
            <i className="fas fa-arrow-left me-1"></i> Return to Public Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
