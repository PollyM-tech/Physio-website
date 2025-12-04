// DoctorDashboard.jsx / DoctorDashboardMain.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";
import toast from "react-hot-toast";

export default function DoctorDashboardMain() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("doctor_token");
      if (!token) {
        setError("You must be logged in as doctor.");
        toast.error("Session expired. Please log in again.");
        navigate("/login");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/appointments`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // 🔹 Special handling for expired/invalid token
        if (res.status === 401) {
          localStorage.removeItem("doctor_auth");
          localStorage.removeItem("doctor_token");
          localStorage.removeItem("doctor_info");
          toast.error("Session expired. Please log in again.");
          navigate("/login");
          return;
        }

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to load appointments");
        }

        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error loading appointments");
        toast.error("Error loading dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  // 📊 Calculate stats from live data
  const stats = useMemo(() => {
    const pending = requests.filter((r) => r.status === "Pending").length;
    const confirmed = requests.filter((r) => r.status === "Confirmed").length;
    const rescheduled = requests.filter(
      (r) => r.status === "Rescheduled"
    ).length;
    return { pending, confirmed, rescheduled, total: requests.length };
  }, [requests]);

  if (loading) {
    return (
      <p className="text-sm text-gray-500">Loading dashboard overview...</p>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-2">Dashboard Overview</h1>
        <p className="text-sm text-red-500 mb-2">{error}</p>
        <p className="text-sm text-gray-500">
          Try refreshing the page or logging in again.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Total Requests</p>
          <h3 className="text-3xl font-bold mt-2">{stats.total}</h3>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Pending</p>
          <h3 className="text-3xl font-bold mt-2">{stats.pending}</h3>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Confirmed</p>
          <h3 className="text-3xl font-bold mt-2">{stats.confirmed}</h3>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Rescheduled</p>
          <h3 className="text-3xl font-bold mt-2">{stats.rescheduled}</h3>
        </div>
      </div>
    </div>
  );
}
