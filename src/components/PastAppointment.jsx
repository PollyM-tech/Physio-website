// PastAppointments.jsx
import React, { useState, useEffect, useMemo } from "react";
import { API_BASE_URL } from "../apiConfig";
import toast from "react-hot-toast";

export default function PastAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [notesDraft, setNotesDraft] = useState({}); // id -> draft text
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");

  // 🔄 Fetch appointments from backend
  useEffect(() => {
    const fetchPast = async () => {
      const token = localStorage.getItem("doctor_token");
      if (!token) {
        toast.error("Session expired. Please log in again.");
        setError("You must be logged in as a doctor.");
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

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to load appointments");
        }

        const data = await res.json();
        setAppointments(data);

        // Initialize notesDraft with existing doctor_notes
        const initialNotes = {};
        data.forEach((a) => {
          initialNotes[a.id] = a.doctor_notes || "";
        });
        setNotesDraft(initialNotes);
      } catch (err) {
        console.error(err);
        toast.error("Error loading past appointments");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPast();
  }, []);

  // 🕒 Filter to only past appointments (before now)
  const past = useMemo(() => {
    const now = new Date();
    return appointments.filter((a) => {
      if (!a.datetime) return false;
      const dt = new Date(a.datetime);
      return dt < now;
    });
  }, [appointments]);

  // 📤 Export CSV with notes
  const exportCSV = () => {
    if (past.length === 0) {
      toast.error("No past appointments to export");
      return;
    }

    const csv = [
      [
        "Patient",
        "Phone",
        "Location",
        "DateTime",
        "Status",
        "Message",
        "Doctor Notes",
      ],
      ...past.map((p) => [
        p.name,
        p.phone,
        p.location,
        new Date(p.datetime).toLocaleString(),
        p.status,
        p.message || "",
        p.doctor_notes || "",
      ]),
    ]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "past_appointments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // 💾 Save notes for a single appointment
  const saveNotes = async (id) => {
    const token = localStorage.getItem("doctor_token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    const notes = notesDraft[id] || "";

    setSavingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notes }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to save notes");
      }

      const updated = await res.json();

      // Update appointments state with new doctor_notes
      setAppointments((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );

      toast.success("Notes saved");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error saving notes");
    } finally {
      setSavingId(null);
    }
  };

  // 🌀 Loading / error
  if (loading) {
    return (
      <p className="text-sm text-gray-500">Loading past appointments...</p>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">Past Appointments</h2>
        <p className="text-sm text-red-500 mb-2">{error}</p>
        <p className="text-sm text-gray-500">
          Try refreshing or logging in again.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header + Export */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Past Appointments</h2>
        <button
          onClick={exportCSV}
          className="px-3 py-2 rounded bg-[#2EA3DD] text-white hover:bg-[#0f5e93]"
        >
          Export CSV
        </button>
      </div>

      {past.length === 0 ? (
        <p className="text-sm text-gray-500">No past appointments yet.</p>
      ) : (
        <div className="grid gap-3">
          {past.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow"
            >
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-semibold">
                    {p.name}{" "}
                    <span className="text-sm text-gray-500">({p.phone})</span>
                  </h4>
                  <p className="text-sm text-gray-500">
                    {p.location} • {new Date(p.datetime).toLocaleString()}
                  </p>
                </div>
                <div className="text-sm px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
                  {p.status}
                </div>
              </div>

              <p className="mb-3 text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Patient note: </span>
                {p.message || "No description provided"}
              </p>

              {/* ✅ Doctor notes editor */}
              <div className="mt-2">
                <label className="block text-sm font-medium mb-1">
                  Doctor’s Notes
                </label>
                <textarea
                  rows="3"
                  className="w-full rounded border px-3 py-2 text-sm dark:bg-gray-700"
                  value={notesDraft[p.id] ?? p.doctor_notes ?? ""}
                  onChange={(e) =>
                    setNotesDraft((prev) => ({
                      ...prev,
                      [p.id]: e.target.value,
                    }))
                  }
                  placeholder="Add follow-up, progress, or clinical notes..."
                />
                <button
                  onClick={() => saveNotes(p.id)}
                  disabled={savingId === p.id}
                  className={`mt-2 px-3 py-2 rounded text-white ${
                    savingId === p.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#2EA3DD] hover:bg-[#0f5e93]"
                  }`}
                >
                  {savingId === p.id ? "Saving..." : "Save Notes"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
