// src/App.jsx
import React from "react";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import About from "./components/About";
import Services from "./components/Services";
import ContactPage from "./components/Contact";
import Homepage from "./components/HomePage";
import AppointmentDetails from "./components/AppointmentDetails";

import DoctorLogin from "./components/DoctorLogin";
import DoctorLayout from "./components/DoctorLayout";
import DoctorDashboardMain from "./components/DoctorDashboard";
import DoctorRequests from "./components/DoctorRequest";
import PastAppointments from "./components/PastAppointment";
import DoctorSchedule from "./components/Doctorschedule";
import PatientDetail from "./components/PatientProfile"; // patient profile

import { AppointmentsProvider } from "./context/Appointmentprovider";

/* ---------------------------------------------------
   Frontend-only guard for doctor area
---------------------------------------------------- */
function RequireDoctorAuth() {
  const authed = localStorage.getItem("doctor_auth") === "true";
  const location = useLocation(); // track where user wanted to go

  if (!authed) {
    // Redirect to login and store intended path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default function App() {
  const location = useLocation();

  // Hide navbar on doctor routes
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
            <Route element={<DoctorLayout />}>
              <Route index element={<DoctorDashboardMain />} />
              <Route path="dashboard" element={<DoctorDashboardMain />} />
              <Route path="schedule" element={<DoctorSchedule />} />
              <Route path="requests" element={<DoctorRequests />} />
              <Route path="past" element={<PastAppointments />} />

              <Route
                path="/doctor/appointments/:id"
                element={<AppointmentDetails />}
              />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Homepage />} />
        </Routes>
      </div>
    </AppointmentsProvider>
  );
}
