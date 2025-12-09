import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Sun, Moon, LogOut, List, Clock, History, CalendarCheck, Menu } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAppointments } from "../context/AppointmentsContext";

export default function DoctorLayout() {
  const [dark, setDark] = useState(() => localStorage.getItem("doctor_theme") === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { upcomingAppointments } = useAppointments();

  // Count today's appointments
  const todayCount = upcomingAppointments.filter((a) => {
    const dt = new Date(a.datetime);
    const now = new Date();
    return dt.toDateString() === now.toDateString();
  }).length;

  // Dark mode toggle
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("doctor_theme", dark ? "dark" : "light");
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("doctor_auth");
    localStorage.removeItem("doctor_token");
    localStorage.removeItem("doctor_info");
    window.location.href = "/login";
  };

  const baseLink = "flex items-center justify-between gap-2 px-3 py-2 rounded transition font-medium";
  const active = "bg-[#2EA3DD]/20 text-[#2EA3DD] dark:bg-[#2EA3DD]/30 dark:text-[#2EA3DD]";
  const inactive = "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 transition">
      <Toaster />

      {/* MOBILE TOGGLE BUTTON */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <h2 className="text-2xl font-bold text-[#2EA3DD]">Dr. David</h2>
        <button onClick={() => setSidebarOpen((p) => !p)} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
          <Menu size={20} />
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static top-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col justify-between transition-transform z-50 min-h-screen lg:min-h-screen ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <h2 className="text-2xl font-bold text-[#2EA3DD] mb-8 hidden lg:block">Dr. David</h2>
          <nav className="flex flex-col gap-2">
            <NavLink to="/doctor/dashboard" className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}>
              <List size={18} /> Dashboard
            </NavLink>

            <NavLink to="/doctor/requests" className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}>
              <Clock size={18} /> Requests
            </NavLink>

            <NavLink to="/doctor/past" className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}>
              <History size={18} /> Past Appointments
            </NavLink>

            <NavLink to="/doctor/schedule" className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}>
              <div className="flex items-center justify-between w-full">
                <span className="flex items-center gap-2">
                  <CalendarCheck size={18} />Schedule
                </span>
                {todayCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {todayCount}
                  </span>
                )}
              </div>
            </NavLink>
          </nav>
        </div>

        {/* FOOTER */}
        <div className="flex items-center gap-3 pt-4 mt-auto">
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

      {/* OVERLAY FOR MOBILE */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* MAIN PANEL */}
      <main className="flex-1 p-6 lg:p-8 text-gray-900 dark:text-gray-100 transition">
        <Outlet />
      </main>
    </div>
  );
}
