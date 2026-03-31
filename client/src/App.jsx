import React from "react";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { Authenticated, Unauthenticated } from "convex/react";

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
import PatientDetail from "./components/PatientProfile";

/* ---------------------------------------------------
   Auth guard using Convex Authenticated/Unauthenticated
---------------------------------------------------- */
function RequireDoctorAuth() {
  const location = useLocation();
  return (
    <>
      <Authenticated>
        <Outlet />
      </Authenticated>
      <Unauthenticated>
        <Navigate to="/login" state={{ from: location }} replace />
      </Unauthenticated>
    </>
  );
}

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/doctor");

  return (
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
            <Route path="patients/:id" element={<PatientDetail />} />
            <Route path="/doctor/appointments/:id" element={<AppointmentDetails />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Homepage />} />
      </Routes>
    </div>
  );
}
