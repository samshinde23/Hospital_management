import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
    <div className="footer-container">
      <div className="footer-about">
        <h3>About This System</h3>
        <p>
        Our Hospital Management System is designed to streamline hospital operations, 
        improve patient care, and enhance administrative efficiency. With an intuitive interface and powerful features, this system helps healthcare professionals manage patient records, appointments, billing, and more—all in one place.
          
        </p>
      </div>

      <div className="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/Register">Register</a></li>
          <li><a href="/Login">Login</a></li>
          <li><a href="/AdminLogin">Admin</a></li>
        </ul>
      </div>

      <div className="footer-social">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      <div className="footer-contact">
        <h3>Contact</h3>
        <p>Email: hospital@blogsite.com</p>
        <p>Phone: +1 234 567 890</p>
      </div>
    </div>

    <div className="footer-bottom">
      <p>&copy; 2025 Hospital. All rights reserved.</p>
    </div>
  </footer>
    
  );
}

export default Footer;
