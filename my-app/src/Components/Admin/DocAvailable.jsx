import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const DocAvailable = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/DocAvailable`);
        if (!response.ok) {
          throw new Error("Error fetching doctors");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Unable to connect to database or fetch available doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filtered = doctors.filter((d) =>
    d.doctor_name && d.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom gap-3">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1 small">
              <li className="breadcrumb-item"><Link to="/DoctorDetails">Doctor Directory</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Available Doctors</li>
            </ol>
          </nav>
          <h2 className="fw-bold text-dark mb-0">Active On-Duty Doctors</h2>
          <p className="text-muted small mb-0">List of medical specialists currently available in cabins or operation theatres.</p>
        </div>

        <div className="d-flex gap-2">
          <button className="btn-modern btn-modern-outline" onClick={() => navigate("/DoctorDetails")}>
            <i className="fas fa-arrow-left"></i> All Doctors
          </button>
          <button className="btn-modern btn-modern-primary" onClick={() => navigate("/UpdateAvailable")}>
            <i className="fas fa-edit"></i> Update Availability
          </button>
        </div>
      </div>

      {error && (
        <div className="alert-modern alert-danger-modern mb-4">
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}

      {/* SEARCH BAR */}
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
              placeholder="Filter by doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-8 text-md-end text-muted small">
          Active Doctors Available: <strong className="text-success">{filtered.length}</strong>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-2" role="status"></div>
            <p className="text-muted small">Loading available doctors...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-user-clock text-muted fs-1 mb-3"></i>
            <h5 className="text-dark fw-bold">No Doctors Currently Available</h5>
            <p className="text-muted small">All registered doctors may be marked on leave or no records found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Current Status</th>
                  <th className="text-end">Roster Management</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doctor, index) => (
                  <tr key={doctor.id || index}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="brand-icon-box"
                          style={{ width: "38px", height: "38px", fontSize: "0.95rem", background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)" }}
                        >
                          <i className="fas fa-stethoscope"></i>
                        </div>
                        <div className="fw-bold text-dark">{doctor.doctor_name}</div>
                      </div>
                    </td>
                    <td>
                      <span className="badge-status badge-available">
                        <i className="fas fa-check-circle"></i> Available / Active Duty
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        onClick={() => navigate("/UpdateAvailable")}
                        className="btn btn-sm btn-light border px-3 py-1 text-primary"
                      >
                        <i className="fas fa-edit me-1"></i> Change Duty
                      </button>
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

export default DocAvailable;
