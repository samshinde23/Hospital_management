import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const DoctorDetails = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/DoctorDetails`);
        if (!response.ok) {
          throw new Error("Error fetching doctors");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Unable to connect to database or fetch doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const getStatusBadge = (status) => {
    if (!status) return <span className="badge-status badge-cabin">Unknown</span>;
    const lower = status.toLowerCase();
    if (lower === "leave") return <span className="badge-status badge-leave"><i className="fas fa-times-circle"></i> On Leave</span>;
    if (lower.startsWith("ot")) return <span className="badge-status badge-ot"><i className="fas fa-procedures"></i> {status}</span>;
    if (lower === "cabin") return <span className="badge-status badge-cabin"><i className="fas fa-door-open"></i> In Cabin</span>;
    return <span className="badge-status badge-available"><i className="fas fa-check-circle"></i> {status}</span>;
  };

  const filteredDoctors = doctors.filter((doc) => {
    const nameMatch = doc.doctor_name && doc.doctor_name.toLowerCase().includes(searchTerm.toLowerCase());
    const specMatch = doc.specialist && doc.specialist.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || specMatch;
  });

  return (
    <div className="container py-4">
      {/* HEADER & NAVIGATION */}
      <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom gap-3">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1 small">
              <li className="breadcrumb-item"><Link to="/Menu">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Doctor Directory</li>
            </ol>
          </nav>
          <h2 className="fw-bold text-dark mb-0">Doctor Information & Availability</h2>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button className="btn-modern btn-modern-outline" onClick={() => navigate("/DocAvailable")}>
            <i className="fas fa-user-check"></i> Available Doctors
          </button>
          <button className="btn-modern btn-modern-outline" onClick={() => navigate("/OTavailable")}>
            <i className="fas fa-hospital"></i> Available OTs
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
              placeholder="Search by doctor name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-8 text-md-end text-muted small">
          Showing <strong>{filteredDoctors.length}</strong> of <strong>{doctors.length}</strong> registered doctors
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-2" role="status"></div>
            <p className="text-muted small">Loading doctor records...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-user-slash text-muted fs-1 mb-3"></i>
            <h5 className="text-dark fw-bold">No Doctors Found</h5>
            <p className="text-muted small">No doctor records matched your search query or database is empty.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Medical Specialty</th>
                  <th>Current Availability / OT</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor, index) => (
                  <tr key={doctor.id || index}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="brand-icon-box"
                          style={{ width: "38px", height: "38px", fontSize: "0.95rem", background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)" }}
                        >
                          <i className="fas fa-user-md"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{doctor.doctor_name}</div>
                          <small className="text-muted">ID: DOC-{1000 + (doctor.id || index + 1)}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border px-2 py-1">
                        {doctor.specialist || "General Physician"}
                      </span>
                    </td>
                    <td>{getStatusBadge(doctor.available)}</td>
                    <td className="text-end">
                      <button
                        onClick={() => navigate("/UpdateAvailable")}
                        className="btn btn-sm btn-light border px-2 py-1 text-primary"
                        title="Update status"
                      >
                        <i className="fas fa-pencil-alt"></i> Edit
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

export default DoctorDetails;
