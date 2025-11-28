// App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import ProfileSettings from "./components/ProfileSetting";

export default function App(){
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/doctor");

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Doctor auth route */}
        <Route path="/login" element={<DoctorLogin />} />

        {/* Doctor area (no public navbar) */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboardMain />} /> {/* /doctor */}
          <Route path="dashboard" element={<DoctorDashboardMain />} /> {/* /doctor/dashboard */}
          <Route path="requests" element={<DoctorRequests />} /> {/* /doctor/requests */}
          <Route path="past" element={<PastAppointments />} /> {/* /doctor/past */}
          <Route path="profile" element={<ProfileSettings />} /> {/* /doctor/profile */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Homepage />} />
      </Routes>
    </div>
  );
}
