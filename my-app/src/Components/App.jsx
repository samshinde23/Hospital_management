import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Components/Home";
import AdminLogin from "./Admin/AdminLogin";
import DoctorDetails from "./Admin/DoctorDetails";
import Menu from "./Admin/Menu";
import PatientDetails from "./Admin/PatientDetails";
import PostOperation from "./Admin/PostOperation"
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
function App() {
  return (
    <>
 
     
      <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/DoctorDetails" element={<DoctorDetails />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/PatientDetails" element={<PatientDetails />} />
        <Route path="/PostOperation" element={<PostOperation />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/SurgicalDetails" element={<SurgicalDetails />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/RegisteredUser" element={<RegisteredUser />} />
        <Route path="/DocAvailable" element={<DocAvailable />} />
        <Route path="/OTavailable" element={<OTavailable />} />
        <Route path="/UpdateAvailable" element={<UpdateAvailable />} />
        <Route path="/SurgeryForm" element={<SurgeryForm />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
