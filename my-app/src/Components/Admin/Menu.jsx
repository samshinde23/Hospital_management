import React from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    navigate("/");
  }

  const menuItems = [
    {
      title: "Doctor Information",
      description: "View full doctor roster, specializations, and real-time availability.",
      icon: "fa-user-md",
      color: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
      action: () => navigate("/DoctorDetails"),
      badge: "Doctors & OTs"
    },
    {
      title: "Patient Details",
      description: "Search and inspect medical complaints, patient age, address, and assigned doctors.",
      icon: "fa-procedures",
      color: "linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)",
      action: () => navigate("/PatientDetails"),
      badge: "Inpatients & Outpatients"
    },
    {
      title: "Post Operation Logs",
      description: "Examine completed surgical interventions, surgeon teams, anesthesia, and OT records.",
      icon: "fa-notes-medical",
      color: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
      action: () => navigate("/PostOperation"),
      badge: "Surgical Reports"
    },
    {
      title: "Registered Users",
      description: "Manage registered patient accounts, verified phone numbers, and credentials.",
      icon: "fa-users-cog",
      color: "linear-gradient(135deg, #d97706 0%, #fbbf24 100%)",
      action: () => navigate("/RegisteredUser"),
      badge: "User Directory"
    },
    {
      title: "Update Availability",
      description: "Assign doctors to active Operation Theatres, Consultation Cabins, or mark on Leave.",
      icon: "fa-calendar-check",
      color: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
      action: () => navigate("/UpdateAvailable"),
      badge: "Roster Management"
    },
    {
      title: "New Surgery Form",
      description: "Schedule surgery for patient, assign lead surgeon, assistants, and OT allocation.",
      icon: "fa-plus-circle",
      color: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
      action: () => navigate("/SurgeryForm"),
      badge: "Booking & Scheduling"
    }
  ];

  return (
    <div className="container py-4">
      {/* HEADER SECTION */}
      <div className="d-flex flex-wrap justify-content-between align-items-center pb-4 mb-4 border-bottom">
        <div>
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2" style={{ background: "#e0f2fe", color: "#0284c7", fontWeight: "700", fontSize: "0.85rem" }}>
            <i className="fas fa-user-shield"></i> Administration Command Center
          </div>
          <h2 className="fw-bold text-dark mb-1">Hospital Management Dashboard</h2>
          <p className="text-muted mb-0">Select a management module below to view records or update medical rosters.</p>
        </div>

        <button
          onClick={handleLogout}
          className="btn-modern btn-modern-danger mt-3 mt-md-0"
        >
          <i className="fas fa-sign-out-alt"></i> Logout Dashboard
        </button>
      </div>

      {/* DASHBOARD GRID */}
      <div className="row g-4">
        {menuItems.map((item, idx) => (
          <div key={idx} className="col-md-6 col-lg-4">
            <div
              className="modern-card h-100 d-flex flex-column p-4 position-relative"
              style={{ cursor: "pointer", transition: "all 0.3s ease" }}
              onClick={item.action}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "#0284c7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div
                  className="brand-icon-box"
                  style={{ background: item.color, width: "52px", height: "52px", fontSize: "1.35rem" }}
                >
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <span className="badge bg-light text-secondary border px-2 py-1" style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                  {item.badge}
                </span>
              </div>

              <h4 className="fw-bold text-dark mb-2" style={{ fontSize: "1.2rem" }}>
                {item.title}
              </h4>
              <p className="text-muted small mb-4 flex-grow-1" style={{ lineHeight: "1.6" }}>
                {item.description}
              </p>

              <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
                <span className="fw-bold small" style={{ color: "#0284c7" }}>
                  Open Module
                </span>
                <i className="fas fa-arrow-right text-primary"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
