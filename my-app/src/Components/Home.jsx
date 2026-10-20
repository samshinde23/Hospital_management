import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <div className="container py-4">
      {/* HERO SECTION */}
      <div className="row align-items-center g-5 py-4 my-2">
        <div className="col-lg-7 text-center text-lg-start">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill" style={{ background: "#e0f2fe", color: "#0284c7", fontWeight: "700", fontSize: "0.85rem" }}>
            <i className="fas fa-certificate"></i> Smart Healthcare Management System
          </div>
          <h1 className="display-4 fw-bold text-dark mb-3" style={{ letterSpacing: "-1px", lineHeight: "1.2" }}>
            Efficient, Secure & <span style={{ color: "#0284c7" }}>Seamless Healthcare</span>
          </h1>
          <p className="lead text-secondary mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
            Our Hospital Management System is designed to streamline healthcare access, patient care, and clinical efficiency. Patients can view on-duty doctor availability, and medical staff can securely coordinate clinical operations.
          </p>

          <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-4">
            <Link to="/Register" className="btn-modern btn-modern-primary">
              <i className="fas fa-user-plus"></i> New Patient Registration
            </Link>
            <Link to="/Login" className="btn-modern btn-modern-outline">
              <i className="fas fa-sign-in-alt"></i> Patient Login
            </Link>
            {isAdmin ? (
              <Link to="/Menu" className="btn-modern btn-modern-subtle">
                <i className="fas fa-user-shield"></i> Open Admin Dashboard
              </Link>
            ) : (
              <Link to="/AdminLogin" className="btn-modern btn-modern-subtle">
                <i className="fas fa-lock"></i> Staff / Admin Portal
              </Link>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="row g-3 pt-3 border-top text-center text-lg-start">
            <div className="col-4">
              <div className="fw-bold text-dark fs-4">24 / 7</div>
              <small className="text-muted">Doctor Availability</small>
            </div>
            <div className="col-4">
              <div className="fw-bold text-dark fs-4">Specialists</div>
              <small className="text-muted">On-Duty Roster</small>
            </div>
            <div className="col-4">
              <div className="fw-bold text-dark fs-4">Secure</div>
              <small className="text-muted">Patient Records</small>
            </div>
          </div>
        </div>

        {/* HERO IMAGE & FLOATING CARDS */}
        <div className="col-lg-5 position-relative">
          <div className="position-relative mx-auto text-center" style={{ maxWidth: "420px" }}>
            <div
              style={{
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(2, 132, 199, 0.25)",
                border: "4px solid white"
              }}
            >
              <img
                src="/doctor1.jpg"
                alt="Hospital Healthcare Team"
                className="img-fluid w-100"
                style={{ objectFit: "cover", maxHeight: "440px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/doctor3.jpg";
                }}
              />
            </div>

            {/* Floating Badge 1 */}
            <div
              className="position-absolute d-flex align-items-center gap-3 p-3 bg-white shadow-lg rounded-4"
              style={{
                bottom: "-20px",
                left: "-15px",
                border: "1px solid #e2e8f0"
              }}
            >
              <div className="brand-icon-box" style={{ width: "45px", height: "45px", fontSize: "1.1rem" }}>
                <i className="fas fa-user-md"></i>
              </div>
              <div className="text-start">
                <div className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Specialist Doctors</div>
                <small className="badge-status badge-available">Available On-Duty</small>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div
              className="position-absolute d-flex align-items-center gap-2 px-3 py-2 bg-white shadow-lg rounded-pill"
              style={{
                top: "20px",
                right: "-15px",
                border: "1px solid #e2e8f0"
              }}
            >
              <span className="badge-status badge-available">
                <i className="fas fa-check-circle"></i> 24/7 Medical Care
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PATIENT-FACING FEATURES GRID */}
      <div className="pt-5 mt-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark mb-2">Hospital Services & Patient Care</h2>
          <p className="text-muted">Designed for clinical excellence, patient convenience, and quality healthcare.</p>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="modern-card h-100 d-flex flex-column text-center p-4">
              <div className="brand-icon-box mx-auto mb-3" style={{ background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)" }}>
                <i className="fas fa-user-md"></i>
              </div>
              <h5 className="fw-bold text-dark mb-2">Doctor Availability</h5>
              <p className="text-muted small mb-4 flex-grow-1">
                Patients can view which specialist doctors are currently on duty and available for consultations.
              </p>
              <Link to="/DocAvailable" className="btn-modern btn-modern-outline py-2 small">
                View On-Duty Doctors
              </Link>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="modern-card h-100 d-flex flex-column text-center p-4">
              <div className="brand-icon-box mx-auto mb-3" style={{ background: "linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)" }}>
                <i className="fas fa-user-plus"></i>
              </div>
              <h5 className="fw-bold text-dark mb-2">Patient Sign-Up</h5>
              <p className="text-muted small mb-4 flex-grow-1">
                Register as a new patient to access consulting surgeons and hospital services.
              </p>
              <Link to="/Register" className="btn-modern btn-modern-outline py-2 small">
                Register Now
              </Link>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="modern-card h-100 d-flex flex-column text-center p-4">
              <div className="brand-icon-box mx-auto mb-3" style={{ background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)" }}>
                <i className="fas fa-stethoscope"></i>
              </div>
              <h5 className="fw-bold text-dark mb-2">Surgical Consultations</h5>
              <p className="text-muted small mb-4 flex-grow-1">
                Log in as a patient to review active surgical consultants and doctor availability.
              </p>
              <Link to="/Login" className="btn-modern btn-modern-outline py-2 small">
                Patient Login
              </Link>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="modern-card h-100 d-flex flex-column text-center p-4">
              <div className="brand-icon-box mx-auto mb-3" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" }}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h5 className="fw-bold text-dark mb-2">Staff Portal</h5>
              <p className="text-muted small mb-4 flex-grow-1">
                Authorized medical administrators can log in to manage OTs, patient records, and surgeries.
              </p>
              <Link to="/AdminLogin" className="btn-modern btn-modern-outline py-2 small">
                Admin Sign-In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
