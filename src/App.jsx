// src/App.jsx
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import About from "./components/About";
import Services from "./components/Services";
import ContactPage from "./components/Contact";
import Homepage from "./components/HomePage";

import DoctorLogin from "./components/DoctorLogin";
import DoctorLayout from "./components/DoctorLayout";
import DoctorDashboardMain from "./components/DoctorDashboard";
import DoctorRequests from "./components/DoctorRequest";
import PastAppointments from "./components/PastAppointment";

import { AppointmentsProvider } from "./context/AppointmentsContext";

// Frontend-only guard for doctor area
function RequireDoctorAuth() {
  const authed = localStorage.getItem("doctor_auth") === "true";
  return authed ? <DoctorLayout /> : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/doctor");

  return (
    <AppointmentsProvider>
      <div className="min-h-screen flex flex-col">
        {!hideNavbar && <Navbar />}

        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Doctor login */}
          <Route path="/login" element={<DoctorLogin />} />

          {/* Protected doctor area */}
          <Route path="/doctor" element={<RequireDoctorAuth />}>
            <Route index element={<DoctorDashboardMain />} /> {/* /doctor */}
            <Route path="dashboard" element={<DoctorDashboardMain />} />{" "}
            {/* /doctor/dashboard */}
            <Route path="requests" element={<DoctorRequests />} />{" "}
            {/* /doctor/requests */}
            <Route path="past" element={<PastAppointments />} />{" "}
            {/* /doctor/past */}
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Homepage />} />
        </Routes>
      </div>
    </AppointmentsProvider>
  );
}
