import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const OTavailability = () => {
  const navigate = useNavigate();
  const [ots, setOts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOTs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/OTavailable`);
        if (!response.ok) {
          throw new Error("Error fetching OT availability");
        }
        const data = await response.json();
        setOts(data);
      } catch (err) {
        console.error("Error fetching available OTs:", err);
        setError("Unable to connect to database or fetch OT details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOTs();
  }, []);

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom gap-3">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1 small">
              <li className="breadcrumb-item"><Link to="/DoctorDetails">Doctor Directory</Link></li>
              <li className="breadcrumb-item active" aria-current="page">OT Availability</li>
            </ol>
          </nav>
          <h2 className="fw-bold text-dark mb-0">Operation Theatre (OT) Status</h2>
          <p className="text-muted small mb-0">Live real-time status of unreserved operating rooms ready for surgical procedures.</p>
        </div>

        <div className="d-flex gap-2">
          <button className="btn-modern btn-modern-outline" onClick={() => navigate("/DoctorDetails")}>
            <i className="fas fa-arrow-left"></i> Doctor Directory
          </button>
          <button className="btn-modern btn-modern-primary" onClick={() => navigate("/SurgeryForm")}>
            <i className="fas fa-plus-circle"></i> Book / Assign OT
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
            <p className="text-muted small">Checking operation theatre statuses...</p>
          </div>
        ) : ots.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-procedures text-muted fs-1 mb-3"></i>
            <h5 className="text-dark fw-bold">All Operation Theatres Occupied</h5>
            <p className="text-muted small">All OTs are currently allocated to active surgeries or maintenance.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Operation Theatre Room</th>
                  <th>Sanitization & Equipment Status</th>
                  <th>Availability</th>
                  <th className="text-end">Immediate Action</th>
                </tr>
              </thead>
              <tbody>
                {ots.map((ot, index) => (
                  <tr key={ot.ot_details_pkey || index}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="brand-icon-box"
                          style={{ width: "40px", height: "40px", fontSize: "1rem", background: "linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)" }}
                        >
                          <i className="fas fa-hospital-alt"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark fs-6">{ot.ot_name}</div>
                          <small className="text-muted">Wing A &bull; Floor 2</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                        <i className="fas fa-check-double me-1"></i> Ready for Surgery
                      </span>
                    </td>
                    <td>
                      <span className="badge-status badge-available">
                        <i className="fas fa-check-circle"></i> Unoccupied / Open
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        onClick={() => navigate("/SurgeryForm")}
                        className="btn btn-sm btn-primary px-3 py-1"
                        style={{ borderRadius: "8px" }}
                      >
                        <i className="fas fa-calendar-plus me-1"></i> Book this OT
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

export default OTavailability;
