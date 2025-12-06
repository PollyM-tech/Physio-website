// src/components/PastAppointments.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";
import toast from "react-hot-toast";

export default function PastAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [notesDraft, setNotesDraft] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔄 Fetch past appointments
  useEffect(() => {
    const fetchPast = async () => {
      const token = localStorage.getItem("doctor_token");
      if (!token) {
        toast.error("Session expired. Please log in again.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/appointments`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          toast.error("Session expired.");
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error("Failed to load appointments");

        const data = await res.json();
        setAppointments(data);

        const drafts = {};
        data.forEach((a) => (drafts[a.id] = ""));
        setNotesDraft(drafts);
      } catch (err) {
        toast.error("Error loading appointments");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPast();
  }, [navigate]);

  // 🕓 Filter past appointments only
  const past = useMemo(() => {
    const now = new Date();
    return appointments.filter(
      (a) => a.datetime && new Date(a.datetime) < now
    );
  }, [appointments]);

  // 📤 Export CSV
  const exportCSV = () => {
    if (!past.length) return toast.error("No data to export");

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
        p.datetime ? new Date(p.datetime).toLocaleString() : "",
        p.status,
        p.message || "",
        p.doctor_notes || "",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "past_appointments.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  // 💾 Save doctor notes
  const saveNotes = async (id) => {
    const token = localStorage.getItem("doctor_token");
    if (!token) {
      toast.error("Login expired");
      navigate("/login");
      return;
    }

    setSavingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notes: notesDraft[id] }),
      });

      if (!res.ok) throw new Error("Failed to save");

      const updated = await res.json();

      setAppointments((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );

      setNotesDraft((prev) => ({ ...prev, [id]: "" }));

      toast.success("Notes saved");
    } catch {
      toast.error("Save failed");
    } finally {
      setSavingId(null);
    }
  };

  // ⏳ Loading / Error UI
  if (loading)
    return (
      <p className="text-center text-slate-400 animate-pulse">
        Loading past appointments...
      </p>
    );

  if (error)
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );

  return (
    <section className="space-y-6">
      {/* 🧠 Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
          Past Appointments
        </h2>

        <button
          onClick={exportCSV}
          className="
            bg-gradient-to-r from-[#2EA3DD] to-[#0f5e93]
            text-white px-4 py-2 rounded-lg
            shadow hover:shadow-lg transition-all
          "
        >
          Export CSV
        </button>
      </div>

      {/* Empty state */}
      {!past.length && (
        <p className="text-slate-400">No past appointments available.</p>
      )}

      {/* 📋 Cards Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {past.map((p) => (
          <div
            key={p.id}
            className="
              bg-white/80 dark:bg-gray-800/80
              backdrop-blur border border-slate-200 dark:border-slate-700
              p-5 rounded-2xl shadow 
              transition hover:shadow-xl hover:-translate-y-1
            "
          >
            {/* Card Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">
                  {p.name}
                  <span className="text-sm text-slate-400 ml-1">
                    ({p.phone})
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {p.location} •{" "}
                  {p.datetime
                    ? new Date(p.datetime).toLocaleString()
                    : "No date"}
                </p>
              </div>

              <span
                className="
                  px-3 py-1 text-xs rounded-full font-medium
                  bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300
                "
              >
                {p.status}
              </span>
            </div>

            {/* Patient Note */}
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              <span className="font-semibold">Patient:</span>{" "}
              {p.message || "No message"}
            </p>

            {/* Previous doctor notes */}
            {p.doctor_notes && (
              <p className="text-xs italic text-slate-400 mb-3">
                <span className="font-medium">Last notes:</span>{" "}
                {p.doctor_notes}
              </p>
            )}

            {/* Notes Editor */}
            <div className="space-y-2">
              <textarea
                rows={3}
                className="
                  w-full rounded-lg border px-3 py-2 text-sm
                  dark:bg-gray-700 focus:ring-2 focus:ring-sky-400
                  focus:outline-none
                "
                value={notesDraft[p.id] || ""}
                onChange={(e) =>
                  setNotesDraft((prev) => ({
                    ...prev,
                    [p.id]: e.target.value,
                  }))
                }
                placeholder="Enter updated clinical notes..."
              />

              <button
                onClick={() => saveNotes(p.id)}
                disabled={savingId === p.id}
                className={`
                  w-full py-2 rounded-lg text-white text-sm
                  transition-all 
                  ${
                    savingId === p.id
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#2EA3DD] to-[#0f5e93] hover:shadow-md"
                  }
                `}
              >
                {savingId === p.id ? "Saving..." : "Save Notes"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
