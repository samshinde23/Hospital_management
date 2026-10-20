import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const PatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/PatientDetails`);
        if (!response.ok) {
          throw new Error("Error fetching patients");
        }
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Unable to connect to database or fetch patient details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) => {
    const nameMatch = p.patient_name && p.patient_name.toLowerCase().includes(searchTerm.toLowerCase());
    const issueMatch = p.health_issue && p.health_issue.toLowerCase().includes(searchTerm.toLowerCase());
    const docMatch = p.doctor && p.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || issueMatch || docMatch;
  });

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom gap-3">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1 small">
              <li className="breadcrumb-item"><Link to="/Menu">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Patient Records</li>
            </ol>
          </nav>
          <h2 className="fw-bold text-dark mb-0">Patient Clinical Records</h2>
        </div>

        <Link to="/SurgeryForm" className="btn-modern btn-modern-primary">
          <i className="fas fa-plus-circle"></i> Schedule Patient Surgery
        </Link>
      </div>

      {error && (
        <div className="alert-modern alert-danger-modern mb-4">
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}

      {/* SEARCH BAR & STATS */}
      <div className="row g-3 align-items-center mb-3">
        <div className="col-md-6 col-lg-4">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0" style={{ borderRadius: "10px 0 0 10px", borderColor: "#cbd5e1" }}>
              <i className="fas fa-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control-modern border-start-0"
              style={{ borderRadius: "0 10px 10px 0", height: "44px" }}
              placeholder="Search by patient name, issue, doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-8 text-md-end text-muted small">
          Showing <strong>{filteredPatients.length}</strong> of <strong>{patients.length}</strong> patient records
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-2" role="status"></div>
            <p className="text-muted small">Loading patient records...</p>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-notes-medical text-muted fs-1 mb-3"></i>
            <h5 className="text-dark fw-bold">No Patient Records Found</h5>
            <p className="text-muted small">Try a different search term or add patient data to database.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Health Issue / Diagnosis</th>
                  <th>Assigned Doctor</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr key={patient.id || index}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="brand-icon-box"
                          style={{ width: "38px", height: "38px", fontSize: "0.95rem", background: "linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)" }}
                        >
                          <i className="fas fa-user"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{patient.patient_name}</div>
                          <small className="text-muted">PID-{2000 + (patient.id || index + 1)}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border px-2 py-1">
                        {patient.age} yrs
                      </span>
                    </td>
                    <td>
                      <div className="text-truncate" style={{ maxWidth: "200px" }}>
                        <i className="fas fa-map-marker-alt text-muted me-1"></i>
                        {patient.address || "N/A"}
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">
                        {patient.health_issue || "Checkup"}
                      </span>
                    </td>
                    <td>
                      <div className="fw-semibold text-primary">
                        <i className="fas fa-user-md me-1"></i> {patient.doctor || "Unassigned"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
