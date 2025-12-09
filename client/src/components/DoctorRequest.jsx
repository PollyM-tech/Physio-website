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

  // Load appointments
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
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.clear();
          toast.error("Session expired. Please log in again.");
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error("Failed to load appointments");
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error loading appointments");
        toast.error(err.message || "Error loading appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  // Filters
  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      if (q && !r.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (from && r.datetime && new Date(r.datetime) < new Date(from)) return false;
      if (to && r.datetime && new Date(r.datetime) > new Date(to)) return false;
      return true;
    });
  }, [requests, q, status, from, to]);

  const confirm = async (id) => {
    const token = localStorage.getItem("doctor_token");
    if (!token) return toast.error("Session expired.");

    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "Confirmed" }),
      });
      if (!res.ok) throw new Error("Failed to confirm appointment");
      const updated = await res.json();
      setRequests((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      toast.success("Appointment confirmed");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error confirming appointment");
    }
  };

  const reschedule = async (id, newDateTime) => {
    if (!newDateTime) return toast.error("Please pick a new date and time");
    const token = localStorage.getItem("doctor_token");
    if (!token) return toast.error("Session expired.");

    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "Rescheduled", datetime: newDateTime }),
      });
      if (!res.ok) throw new Error("Failed to reschedule appointment");
      const updated = await res.json();
      setRequests((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      toast.success("Appointment rescheduled");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error rescheduling appointment");
    }
  };

  const exportCSV = () => {
    if (!filtered.length) return toast.error("No data to export");

    const csv = [
      ["Patient", "Status", "Location", "DateTime", "Message"],
      ...filtered.map((r) => [
        r.name,
        r.status,
        r.location,
        r.datetime ? new Date(r.datetime).toLocaleString() : "",
        r.message || "",
      ]),
    ]
      .map((row) => row.map((c) => `"${c}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "appointments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <SkeletonLoader />;
  if (error)
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-2">{error}</p>
        <p className="text-gray-500">Try refreshing or logging in again.</p>
      </div>
    );

  return (
    <div className="space-y-6 p-4">
      {/* Filters & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-3 justify-between">
        <div className="flex flex-wrap gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search patient..."
            className="px-3 py-2 rounded border w-full sm:w-auto dark:bg-gray-700"
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
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          Export CSV
        </button>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && <p className="text-gray-500">No appointments found.</p>}

        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate">{r.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-300 truncate">
                {r.location} • {r.datetime ? new Date(r.datetime).toLocaleString() : "No date"}
              </p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300 truncate">{r.message}</p>
              <span
                className={`mt-2 inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  r.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : r.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {r.status}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
              <button
                onClick={() => confirm(r.id)}
                disabled={r.status === "Confirmed" || r.status === "Rescheduled"}
                className={`flex-1 py-2 px-3 rounded text-white text-center ${
                  r.status === "Confirmed" || r.status === "Rescheduled"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Confirm
              </button>
              <button
                onClick={() => setSelected(r)}
                className="flex-1 py-2 px-3 rounded bg-gray-200 dark:bg-gray-700 text-center"
              >
                Details / Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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

/* Skeleton Loader */
function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}
