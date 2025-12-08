import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentModal from "./AppointmentModal";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../apiConfig";

export default function DoctorRequests() {
  const [requests, setRequests] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🟢 Load appointments from backend on mount
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

        // 🔹 Handle invalid/expired token
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
        toast.error("Error loading appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  // 🔍 Filters (search, status, date range)
  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      if (q && !r.name.toLowerCase().includes(q.toLowerCase())) return false;

      if (from && r.datetime) {
        if (new Date(r.datetime) < new Date(from)) return false;
      }
      if (to && r.datetime) {
        // add one day to "to" date to make it inclusive if you want
        if (new Date(r.datetime) > new Date(to)) return false;
      }

      return true;
    });
  }, [requests, q, status, from, to]);

  // ✅ Confirm appointment → PATCH + update state
  const confirm = async (id) => {
    const token = localStorage.getItem("doctor_token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Confirmed" }),
      });

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
        throw new Error(data.message || "Failed to confirm appointment");
      }

      const updated = await res.json(); // backend returns appt.to_dict()

      setRequests((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
      toast.success("Appointment confirmed");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error confirming appointment");
    }
  };

  // ✅ Reschedule appointment → PATCH + update state
  const reschedule = async (id, newDateTime) => {
    if (!newDateTime) {
      toast.error("Please pick a new date and time");
      return;
    }

    const token = localStorage.getItem("doctor_token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "Rescheduled",
          datetime: newDateTime,
        }),
      });

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
        throw new Error(data.message || "Failed to reschedule appointment");
      }

      const updated = await res.json();

      setRequests((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
      toast.success("Appointment rescheduled");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error rescheduling appointment");
    }
  };

  // 🌀 Loading & error UI
  if (loading) {
    return <p className="text-sm text-gray-500">Loading appointments...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="text-sm text-red-500 mb-2">{error}</p>
        <p className="text-sm text-gray-500">
          Try refreshing the page or logging in again.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search patient..."
          className="px-3 py-2 rounded border w-full md:w-auto dark:bg-gray-700"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 rounded border dark:bg-gray-700"
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Rescheduled">Rescheduled</option>
        </select>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="px-3 py-2 rounded border dark:bg-gray-700"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="px-3 py-2 rounded border dark:bg-gray-700"
        />
      </div>

      {/* Appointments list */}
      <div className="grid gap-3">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">No appointments found.</p>
        )}

        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-start"
          >
            <div>
              <h4 className="font-semibold">{r.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {r.location} •{" "}
                {r.datetime ? new Date(r.datetime).toLocaleString() : "No date"}
              </p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                {r.message}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-sm px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900/30">
                {r.status}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => confirm(r.id)}
                  className={`px-3 py-1 rounded text-white ${
                    r.status === "Confirmed" || r.status === "Rescheduled"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  disabled={
                    r.status === "Confirmed" || r.status === "Rescheduled"
                  }
                >
                  Confirm
                </button>
                <button
                  onClick={() => setSelected(r)}
                  className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
                >
                  Details / Reschedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for details & reschedule */}
      {selected && (
        <AppointmentModal
          appointment={selected}
          onClose={() => setSelected(null)}
          onConfirm={(id) => {
            confirm(id);
            setSelected(null);
          }}
          onReschedule={(id, newDateTime) => {
            reschedule(id, newDateTime);
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}
