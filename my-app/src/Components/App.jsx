import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../Components/Home";
import AdminLogin from "./Admin/AdminLogin";
import DoctorDetails from "./Admin/DoctorDetails";
import Menu from "./Admin/Menu";
import PatientDetails from "./Admin/PatientDetails";
import PostOperation from "./Admin/PostOperation";
import Login from "./User/Login";
import Register from "./User/Register";
import SurgicalDetails from "./User/SurgicalDetails";
import Footer from "../Components/Footer";
import Navbar from "./Navbar";
import RegisteredUser from "./Admin/RegisteredUser";
import DocAvailable from "./Admin/DocAvailable";
import OTavailable from "./Admin/OTavailable";
import UpdateAvailable from "./Admin/UpdateAvailable";
import SurgeryForm from "./Admin/SurgeryForm";

// Protected Route component for Admin-only modules
const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("role") === "admin";
  return isAdmin ? children : <Navigate to="/AdminLogin" replace />;
};

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="main-content flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />

          {/* Patient Accessible Routes */}
          <Route path="/SurgicalDetails" element={<SurgicalDetails />} />
          <Route path="/DocAvailable" element={<DocAvailable />} />

          {/* Admin Protected Routes - only accessible after Admin Login */}
          <Route path="/Menu" element={<AdminRoute><Menu /></AdminRoute>} />
          <Route path="/DoctorDetails" element={<AdminRoute><DoctorDetails /></AdminRoute>} />
          <Route path="/PatientDetails" element={<AdminRoute><PatientDetails /></AdminRoute>} />
          <Route path="/PostOperation" element={<AdminRoute><PostOperation /></AdminRoute>} />
          <Route path="/RegisteredUser" element={<AdminRoute><RegisteredUser /></AdminRoute>} />
          <Route path="/OTavailable" element={<AdminRoute><OTavailable /></AdminRoute>} />
          <Route path="/UpdateAvailable" element={<AdminRoute><UpdateAvailable /></AdminRoute>} />
          <Route path="/SurgeryForm" element={<AdminRoute><SurgeryForm /></AdminRoute>} />

          {/* Fallback */}
          <Route path="/Footer" element={<Footer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
