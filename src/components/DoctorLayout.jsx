// src/components/DoctorLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut, List, Clock, History, CalendarCheck } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAppointments } from "../context/AppointmentsContext";

export default function DoctorLayout() {
  const [dark, setDark] = useState(() => localStorage.getItem("doctor_theme") === "dark");
  const navigate = useNavigate();
  const { upcomingAppointments } = useAppointments();

  // Count today's appointments
  const todayCount = upcomingAppointments.filter((a) => {
    const dt = new Date(a.datetime);
    const now = new Date();
    return (
      dt.getFullYear() === now.getFullYear() &&
      dt.getMonth() === now.getMonth() &&
      dt.getDate() === now.getDate()
    );
  }).length;

  // Toggle dark/light mode
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("doctor_theme", dark ? "dark" : "light");
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("doctor_auth");
    localStorage.removeItem("doctor_token");
    localStorage.removeItem("doctor_info");
    navigate("/login");
  };

  const baseLink =
    "flex items-center justify-between gap-2 px-3 py-2 rounded transition font-medium";
  const active =
    "bg-[#2EA3DD]/20 text-[#2EA3DD] dark:bg-[#2EA3DD]/30 dark:text-[#2EA3DD]";
  const inactive =
    "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 transition">
      <Toaster />

      {/* SIDEBAR */}
      <aside className="w-full lg:w-64 bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col justify-between transition min-h-[100vh] lg:min-h-screen">
        <div>
          <h2 className="text-2xl font-bold text-[#2EA3DD] mb-8">Dr. David</h2>

          <nav className="flex flex-col gap-2">
            <NavLink
              to="/doctor/dashboard"
              className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}
            >
              <List size={18} /> Dashboard
            </NavLink>

            <NavLink
              to="/doctor/requests"
              className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}
            >
              <Clock size={18} /> Requests
            </NavLink>

            <NavLink
              to="/doctor/past"
              className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}
            >
              <History size={18} /> Past Appointments
            </NavLink>

            <NavLink
              to="/doctor/schedule"
              className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}
            >
              <CalendarCheck size={18} /> Schedule
              {todayCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {todayCount}
                </span>
              )}
            </NavLink>
          </nav>
        </div>

        {/* FOOTER */}
        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={() => setDark((p) => !p)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN PANEL */}
      <main className="flex-1 p-6 lg:p-8 text-gray-900 dark:text-gray-100 transition">
        <Outlet />
      </main>
    </div>
  );
}
