import React, { useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

function UpdateAvailable() {
  const [doc, setDoc] = useState({
    doctor_name: "",
    available: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setDoc((prev) => ({ ...prev, [name]: value }));
  }

  async function handleClick(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    if (!doc.doctor_name || !doc.available) {
      setError("Please specify both doctor name and availability.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/UpdateAvailable`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Update successful:", responseData);
        setSuccess(true);
        setDoc({ doctor_name: "", available: "" });
        setError(null);
      } else {
        console.error("Error from server:", responseData);
        setError(`Failed to update: ${responseData.error || "Doctor not found"}`);
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
      <div className="auth-card" style={{ maxWidth: "480px" }}>
        <div className="auth-header">
          <div className="icon-circle" style={{ background: "#e0f2fe", color: "#0284c7" }}>
            <i className="fas fa-user-clock"></i>
          </div>
          <h2 className="auth-title">Update Availability</h2>
          <p className="auth-subtitle">Assign doctor to an active OT, Cabin, or mark as on Leave</p>
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
            <span>Doctor availability status successfully updated in database!</span>
          </div>
        )}

        <form onSubmit={handleClick}>
          <div className="form-group-modern">
            <label className="form-label-modern" htmlFor="doctor_name">Doctor Name</label>
            <input
              id="doctor_name"
              onChange={handleChange}
              type="text"
              name="doctor_name"
              className="form-control-modern"
              placeholder="e.g. Dr. John Watson"
              value={doc.doctor_name}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern" htmlFor="available">Current Availability</label>
            <select
              id="available"
              name="available"
              className="form-control-modern"
              onChange={handleChange}
              value={doc.available}
              disabled={loading}
              required
            >
              <option value="">-- Select Availability Location --</option>
              <optgroup label="Operation Theatre (OT)">
                <option value="OT1">OT 1 (Operation Theatre 1)</option>
                <option value="OT2">OT 2 (Operation Theatre 2)</option>
                <option value="OT3">OT 3 (Operation Theatre 3)</option>
              </optgroup>
              <optgroup label="Other Locations">
                <option value="Cabin">Doctor Consulting Cabin</option>
                <option value="Leave">On Leave / Off-Duty</option>
              </optgroup>
            </select>
          </div>

          <button type="submit" className="btn-modern btn-modern-primary w-100 mt-2" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Updating Roster...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i> Save Availability Status
              </>
            )}
          </button>
        </form>

        <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top small">
          <Link to="/DoctorDetails" className="text-decoration-none text-muted">
            <i className="fas fa-list me-1"></i> Doctor Directory
          </Link>
          <Link to="/Menu" className="text-decoration-none text-primary fw-semibold">
            Admin Dashboard <i className="fas fa-arrow-right ms-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UpdateAvailable;
