import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";

const RegisteredUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/RegisteredUser`);
        if (!response.ok) {
          throw new Error("Error fetching users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Unable to connect to database or fetch registered users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const name = (u.firstname || u.FirstName || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    const phone = (u.phone || "").toLowerCase();
    const query = searchTerm.toLowerCase();
    return name.includes(query) || email.includes(query) || phone.includes(query);
  });

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom gap-3">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1 small">
              <li className="breadcrumb-item"><Link to="/Menu">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Registered Users</li>
            </ol>
          </nav>
          <h2 className="fw-bold text-dark mb-0">Registered User Accounts</h2>
        </div>

        <Link to="/Register" className="btn-modern btn-modern-primary">
          <i className="fas fa-user-plus"></i> Register New User
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
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-8 text-md-end text-muted small">
          Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> registered patient profiles
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-2" role="status"></div>
            <p className="text-muted small">Loading user accounts...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-users-slash text-muted fs-1 mb-3"></i>
            <h5 className="text-dark fw-bold">No Users Found</h5>
            <p className="text-muted small">No registered user profiles found matching your query.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Email Address</th>
                  <th>Contact Phone</th>
                  <th>Account Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id || index}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="brand-icon-box"
                          style={{ width: "38px", height: "38px", fontSize: "0.95rem", background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" }}
                        >
                          <i className="fas fa-user-circle"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{user.firstname || user.FirstName}</div>
                          <small className="text-muted">UID-{100 + (user.id || index + 1)}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-secondary">
                        <i className="fas fa-envelope me-1 text-muted"></i> {user.email}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border px-2 py-1">
                        <i className="fas fa-phone-alt me-1 text-muted"></i> {user.phone}
                      </span>
                    </td>
                    <td>
                      <span className="badge-status badge-available">
                        <i className="fas fa-check-circle"></i> Active
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

export default RegisteredUser;
