import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const SurgicalDetails = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Try /SurgicalDetails or /DoctorDetails fallback
        let response = await fetch(`${API_BASE_URL}/SurgicalDetails`);
        if (!response.ok) {
          response = await fetch(`${API_BASE_URL}/DoctorDetails`);
        }
        if (!response.ok) {
          throw new Error("Error fetching surgical doctor information");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Unable to connect to database or fetch surgical doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom gap-3">
        <div>
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2" style={{ background: "#e0f2fe", color: "#0284c7", fontWeight: "700", fontSize: "0.85rem" }}>
            <i className="fas fa-user-check"></i> Patient Dashboard
          </div>
          <h2 className="fw-bold text-dark mb-0">Active Surgical Doctors</h2>
          <p className="text-muted small mb-0">Doctors currently on active duty and ready for surgical consultations.</p>
        </div>

        <div className="d-flex gap-2">
          <button className="btn-modern btn-modern-primary" onClick={() => navigate("/DocAvailable")}>
            <i className="fas fa-stethoscope"></i> Check Doctor Availability
          </button>
        </div>
      </div>

      {error && (
        <div className="alert-modern alert-danger-modern mb-4">
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}

      {/* TABLE */}
      <div className="table-container">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-2" role="status"></div>
            <p className="text-muted small">Loading doctor records...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-user-md text-muted fs-1 mb-3"></i>
            <h5 className="text-dark fw-bold">No Doctors Currently Found</h5>
            <p className="text-muted small">No active surgical consultants found in the database.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Medical Specialty</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor, index) => (
                  <tr key={doctor.id || index}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="brand-icon-box"
                          style={{ width: "38px", height: "38px", fontSize: "0.95rem", background: "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)" }}
                        >
                          <i className="fas fa-user-md"></i>
                        </div>
                        <div className="fw-bold text-dark">{doctor.doctor_name}</div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border px-2 py-1">
                        {doctor.specialist || "Surgeon"}
                      </span>
                    </td>
                    <td>
                      <span className="badge-status badge-available">
                        <i className="fas fa-check-circle"></i> {doctor.available || "Active Duty"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <Link to="/" className="text-muted text-decoration-none small">
          <i className="fas fa-arrow-left me-1"></i> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SurgicalDetails;
