// src/components/DoctorSchedule.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { API_BASE_URL } from "../apiConfig";
import WeeklyCalendar from "./WeeklyCalendar";
import RescheduleModal from "./RescheduleModal";

export default function DoctorSchedule() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reschedule, setReschedule] = useState(null);

  // -----------------------------
  // Fetch Appointments
  // -----------------------------
  useEffect(() => {
    const loadAppointments = async () => {
      const token = localStorage.getItem("doctor_token");
      if (!token) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.clear();
          toast.error("Session expired.");
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error("Unable to load schedule.");
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error loading appointments");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [navigate]);

  // -----------------------------
  // Today's Appointments
  // -----------------------------
  const today = useMemo(() => {
    const nowStr = new Date().toDateString();
    return appointments.filter(
      (a) => a.datetime && new Date(a.datetime).toDateString() === nowStr
    );
  }, [appointments]);

  // -----------------------------
  // Upcoming Appointments
  // -----------------------------
  const upcoming = useMemo(() => {
    const now = new Date();
    return appointments
      .filter((a) => a.datetime && new Date(a.datetime) > now)
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  }, [appointments]);

  // -----------------------------
  // Loading & Error UI
  // -----------------------------
  if (loading) return <p className="text-gray-500">Loading schedule...</p>;
  if (error)
    return (
      <div>
        <h1 className="text-xl font-semibold mb-2">Doctor Schedule</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );

  // -----------------------------
  // Render UI
  // -----------------------------
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700">Doctor Schedule</h1>
          <p className="text-sm text-gray-500">Manage your patients & upcoming visits</p>
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600">
          {today.length} Appointments Today
        </span>
      </div>

      {/* Today's Appointments */}
      <section>
        <h2 className="font-semibold mb-3">Today's Visits</h2>
        {today.length === 0 ? (
          <p className="text-gray-500">No appointments today.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {today.map((a) => (
              <AppointmentCard key={a.id} a={a} navigate={navigate} onReschedule={() => setReschedule(a)} />
            ))}
          </div>
        )}
      </section>

      {/* Weekly Calendar */}
      <section>
        <h2 className="font-semibold mb-3">Weekly Calendar</h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming appointments.</p>
        ) : (
          <WeeklyCalendar appointments={upcoming} />
        )}
      </section>

      {/* Upcoming Appointments */}
      <section>
        <h2 className="font-semibold mb-3">Upcoming Appointments</h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-500">No scheduled appointments.</p>
        ) : (
          <div className="space-y-3">
            {upcoming.map((a) => (
              <AppointmentCard key={a.id} a={a} navigate={navigate} onReschedule={() => setReschedule(a)} />
            ))}
          </div>
        )}
      </section>

      {/* Reschedule Modal */}
      {reschedule && (
        <RescheduleModal
          appointment={reschedule}
          onClose={() => setReschedule(null)}
          onUpdate={(updated) =>
            setAppointments((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
          }
        />
      )}
    </div>
  );
}

/* ===================================================== */
/* Appointment Card Component */
/* ===================================================== */
function AppointmentCard({ a, navigate, onReschedule }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-lg transition border border-gray-200 dark:border-gray-700">
      <h3 className="font-bold">{a.name}</h3>
      <p className="text-sm text-gray-500">{new Date(a.datetime).toLocaleString()}</p>
      <p className="text-sm">{a.location}</p>

      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => navigate(`/doctor/patients/${a.id}`)} // ← updated path
          className="flex-1 py-2 text-sm rounded border hover:bg-gray-50"
        >
          View Patient
        </button>

        <button
          onClick={onReschedule}
          className="flex-1 py-2 text-sm rounded text-white bg-[#2EA3DD] hover:bg-[#0f5e93]"
        >
          Reschedule
        </button>
      </div>
    </div>
  );
}
