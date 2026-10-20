import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <footer className="modern-footer">
      <div className="container">
        <div className="row g-4 pb-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <div className="brand-icon-box" style={{ width: "36px", height: "36px", fontSize: "1rem" }}>
                <i className="fas fa-heartbeat"></i>
              </div>
              <span>MediCare HMS</span>
            </div>
            <p className="footer-desc">
              Designed to streamline hospital operations, improve patient care, and enhance administrative efficiency. A trusted platform for healthcare professionals and patients.
            </p>
            <div className="social-pills mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-link-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Register">Patient Register</Link></li>
              <li><Link to="/Login">Patient Login</Link></li>
              <li><Link to="/DocAvailable">Available Doctors</Link></li>
              <li><Link to="/AdminLogin">Admin Portal</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-6">
            <h5 className="footer-heading">Hospital Access</h5>
            <ul className="footer-link-list">
              <li><Link to="/DocAvailable">On-Duty Doctors</Link></li>
              <li><Link to="/Login">Surgical Consultations</Link></li>
              {isAdmin && (
                <>
                  <li><Link to="/Menu" className="text-primary fw-semibold">Admin Dashboard</Link></li>
                  <li><Link to="/DoctorDetails">Manage Doctors</Link></li>
                  <li><Link to="/PatientDetails">Patient Records</Link></li>
                </>
              )}
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Emergency & Contact</h5>
            <div className="d-flex align-items-center gap-2 mb-2 text-light">
              <i className="fas fa-phone-alt text-primary"></i>
              <span className="fw-bold">+1 (800) 234-5678</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-3 text-light">
              <i className="fas fa-envelope text-primary"></i>
              <span>support@medicare-hms.com</span>
            </div>
            <div className="p-3 rounded-3" style={{ background: "#1e293b", border: "1px solid #334155" }}>
              <div className="text-white fw-bold small mb-1">
                <i className="fas fa-ambulance text-danger me-2"></i> 24/7 Emergency Line
              </div>
              <small className="text-muted">Direct ambulance and emergency room dispatch assistance available anytime.</small>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>
            &copy; {new Date().getFullYear()} MediCare Hospital Management System. All rights reserved.
          </div>
          <div className="d-flex gap-3">
            <span>Privacy Policy</span>
            <span>&bull;</span>
            <span>Terms of Service</span>
            <span>&bull;</span>
            <span>HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
