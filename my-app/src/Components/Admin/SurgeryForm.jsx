import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

function SurgeryForm() {
  const [doc, setDoc] = useState({
    patient_name: "",
    done_by: "",
    available: "",
    anasthesia: "",
    nurse: "",
    date: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setDoc((prev) => ({ ...prev, [name]: value }));
  }

  async function handleClick(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/SurgeryForm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Update successful:", responseData);
        setDoc({
          patient_name: "",
          done_by: "",
          available: "",
          anasthesia: "",
          nurse: "",
          date: "",
        });
        setSuccess(true);
        setError(null);
      } else {
        console.error("Error from server:", responseData);
        setError(`Failed to save surgery: ${responseData.error || "Missing required fields"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to connect to backend server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4">
      <div className="mx-auto" style={{ maxWidth: "680px" }}>
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1 small">
                <li className="breadcrumb-item"><Link to="/Menu">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/PostOperation">Post Operation</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Log Surgery</li>
              </ol>
            </nav>
            <h2 className="fw-bold text-dark mb-0">Surgery Schedule & Record Form</h2>
          </div>
          <button className="btn-modern btn-modern-subtle btn-sm" onClick={() => navigate("/PostOperation")}>
            <i className="fas fa-list me-1"></i> View Logs
          </button>
        </div>

        <div className="modern-card p-4 p-md-5">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="brand-icon-box" style={{ background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)" }}>
              <i className="fas fa-procedures"></i>
            </div>
            <div>
              <h4 className="fw-bold text-dark mb-1">Log Surgical Procedure</h4>
              <p className="text-muted small mb-0">Enter surgical details, assigned operation theatre, and attending staff.</p>
            </div>
          </div>

          {error && (
            <div className="alert-modern alert-danger-modern mb-4">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert-modern alert-success-modern mb-4">
              <i className="fas fa-check-circle"></i>
              <span>Surgery record successfully logged in database!</span>
            </div>
          )}

          <form onSubmit={handleClick}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group-modern">
                  <label className="form-label-modern" htmlFor="patient_name">Patient Name *</label>
                  <input
                    id="patient_name"
                    onChange={handleChange}
                    type="text"
                    name="patient_name"
                    className="form-control-modern"
                    placeholder="e.g. Robert Smith"
                    value={doc.patient_name}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group-modern">
                  <label className="form-label-modern" htmlFor="done_by">Lead Operating Surgeon *</label>
                  <input
                    id="done_by"
                    onChange={handleChange}
                    type="text"
                    name="done_by"
                    className="form-control-modern"
                    placeholder="e.g. Dr. Emily Thorne"
                    value={doc.done_by}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group-modern">
                  <label className="form-label-modern" htmlFor="available">Operation Theatre (OT) *</label>
                  <select
                    id="available"
                    name="available"
                    className="form-control-modern"
                    onChange={handleChange}
                    value={doc.available}
                    disabled={loading}
                    required
                  >
                    <option value="">-- Select Allocated OT --</option>
                    <option value="OT1">OT 1 (General Surgery)</option>
                    <option value="OT2">OT 2 (Orthopedic & Trauma)</option>
                    <option value="OT3">OT 3 (Cardiac & Neuro)</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group-modern">
                  <label className="form-label-modern" htmlFor="anasthesia">Anesthesia Type Administered *</label>
                  <input
                    id="anasthesia"
                    onChange={handleChange}
                    type="text"
                    name="anasthesia"
                    className="form-control-modern"
                    placeholder="e.g. General, Spinal, Local"
                    value={doc.anasthesia}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group-modern">
                  <label className="form-label-modern" htmlFor="nurse">Assistant Nurses & Staff</label>
                  <input
                    id="nurse"
                    onChange={handleChange}
                    type="text"
                    name="nurse"
                    className="form-control-modern"
                    placeholder="e.g. Nurse Sarah, Tech Mike"
                    value={doc.nurse}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group-modern">
                  <label className="form-label-modern" htmlFor="date">Date of Surgery *</label>
                  <input
                    id="date"
                    onChange={handleChange}
                    type="date"
                    name="date"
                    className="form-control-modern"
                    value={doc.date}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 justify-content-end mt-4 pt-3 border-top">
              <button
                type="button"
                className="btn-modern btn-modern-subtle"
                onClick={() => navigate("/PostOperation")}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn-modern btn-modern-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving Record...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle"></i> Save Surgery Record
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SurgeryForm;
