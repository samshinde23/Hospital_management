import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const PostOperation = () => {
  const navigate = useNavigate();
  const [surgeries, setSurgeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurgeries = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/PostOperation`);
        if (!response.ok) {
          throw new Error("Error fetching surgery records");
        }
        const data = await response.json();
        setSurgeries(data);
      } catch (err) {
        console.error("Error fetching surgery data:", err);
        setError("Unable to connect to database or fetch surgery details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurgeries();
  }, []);

  const filteredSurgeries = surgeries.filter((s) => {
    const pMatch = s.patient_name && s.patient_name.toLowerCase().includes(searchTerm.toLowerCase());
    const docMatch = s.done_by && s.done_by.toLowerCase().includes(searchTerm.toLowerCase());
    const otMatch = s.available && s.available.toLowerCase().includes(searchTerm.toLowerCase());
    return pMatch || docMatch || otMatch;
  });

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom gap-3">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1 small">
              <li className="breadcrumb-item"><Link to="/Menu">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Post Operation</li>
            </ol>
          </nav>
          <h2 className="fw-bold text-dark mb-0">Post Operation Surgical Records</h2>
        </div>

        <button className="btn-modern btn-modern-primary" onClick={() => navigate("/SurgeryForm")}>
          <i className="fas fa-plus-circle"></i> Log New Surgery
        </button>
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
              placeholder="Search by patient, surgeon, or OT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-8 text-md-end text-muted small">
          Showing <strong>{filteredSurgeries.length}</strong> of <strong>{surgeries.length}</strong> operation logs
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-2" role="status"></div>
            <p className="text-muted small">Loading surgical records...</p>
          </div>
        ) : filteredSurgeries.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-procedures text-muted fs-1 mb-3"></i>
            <h5 className="text-dark fw-bold">No Surgery Records Found</h5>
            <p className="text-muted small">Click "Log New Surgery" to add a new surgery record.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Lead Surgeon</th>
                  <th>Operation Theatre</th>
                  <th>Anesthesia Administered</th>
                  <th>Assistant Nurses</th>
                  <th>Date Conducted</th>
                </tr>
              </thead>
              <tbody>
                {filteredSurgeries.map((s, index) => (
                  <tr key={s.id || index}>
                    <td>
                      <div className="fw-bold text-dark">
                        <i className="fas fa-user-injured text-primary me-2"></i>
                        {s.patient_name}
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold text-secondary">
                        <i className="fas fa-user-md me-1"></i> {s.done_by}
                      </div>
                    </td>
                    <td>
                      <span className="badge-status badge-ot">
                        <i className="fas fa-procedures"></i> {s.available || "OT-1"}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border px-2 py-1">
                        <i className="fas fa-syringe me-1 text-muted"></i> {s.anasthesia || "General"}
                      </span>
                    </td>
                    <td>
                      <small className="text-muted">
                        <i className="fas fa-user-nurse me-1 text-info"></i> {s.nurse || "Clinical team"}
                      </small>
                    </td>
                    <td>
                      <span className="text-muted small">
                        <i className="far fa-calendar-alt me-1"></i>
                        {s.date ? new Date(s.date).toLocaleDateString() : "Recent"}
                      </span>
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

export default PostOperation;
