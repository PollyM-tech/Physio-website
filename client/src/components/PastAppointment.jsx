import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";

export default function PastAppointments() {
  const [notesDraft, setNotesDraft] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const appointments = useQuery(api.appointments.listAppointments);
  const updateAppointment = useMutation(api.appointments.updateAppointment);
  const loading = appointments === undefined;

  const past = useMemo(() => {
    if (!appointments) return [];
    const now = Date.now();
    return appointments.filter((a) => a.scheduledAt && a.scheduledAt < now);
  }, [appointments]);

  const filtered = useMemo(() => {
    return past.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [past, search, statusFilter]);

  const exportCSV = () => {
    if (!filtered.length) return toast.error("No data to export");
    const csv = [
      ["Patient", "Phone", "Location", "DateTime", "Status", "Message", "Doctor Notes"],
      ...filtered.map((p) => [
        p.name,
        p.phone,
        p.location,
        p.scheduledAt ? new Date(p.scheduledAt).toLocaleString() : "",
        p.status,
        p.message || "",
        p.doctorNotes || "",
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

  const saveNotes = async (id, notes) => {
    setSavingId(id);
    try {
      await updateAppointment({ id, doctorNotes: notes });
      setNotesDraft((prev) => ({ ...prev, [id]: "" }));
      toast.success("Notes saved");
    } catch {
      toast.error("Save failed");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <SkeletonLoader />;

  return (
    <section className="space-y-6 p-4">
      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
          Past Appointments
        </h2>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded border dark:bg-gray-700"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded border dark:bg-gray-700"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Rescheduled">Rescheduled</option>
          </select>
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <p className="text-gray-500 col-span-full">No past appointments found.</p>
        )}
        {filtered.map((p) => (
          <div
            key={p._id}
            onClick={() => setSelectedAppointment(p)}
            className="cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow transition hover:shadow-xl hover:-translate-y-1 flex flex-col"
          >
            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {p.name} <span className="text-sm text-slate-400">({p.phone})</span>
                </h3>
                <p className="text-xs text-slate-500 truncate">
                  {p.location} •{" "}
                  {p.scheduledAt ? new Date(p.scheduledAt).toLocaleString() : "No date"}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  p.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : p.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {p.status}
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
              <span className="font-semibold">Message:</span> {p.message || "No message"}
            </p>
            {p.doctorNotes && (
              <p className="text-xs italic text-slate-400 truncate">
                <span className="font-medium">Last notes:</span> {p.doctorNotes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          notesDraft={notesDraft[selectedAppointment._id] || ""}
          onChangeNotes={(notes) =>
            setNotesDraft((prev) => ({ ...prev, [selectedAppointment._id]: notes }))
          }
          onSave={() =>
            saveNotes(selectedAppointment._id, notesDraft[selectedAppointment._id] || "")
          }
          onClose={() => setSelectedAppointment(null)}
          saving={savingId === selectedAppointment._id}
        />
      )}
    </section>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-60 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}

export function AppointmentModal({ appointment, notesDraft, onChangeNotes, onSave, onClose, saving }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 shadow-xl overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-bold text-indigo-600 mb-4 truncate">{appointment.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Phone:</strong> {appointment.phone}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Location:</strong> {appointment.location}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Date:</strong>{" "}
          {appointment.scheduledAt
            ? new Date(appointment.scheduledAt).toLocaleString()
            : "No date"}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Status:</strong> {appointment.status}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <strong>Patient Message:</strong> {appointment.message || "No message"}
        </p>

        <textarea
          rows={4}
          className="w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-700 mb-4 focus:ring-2 focus:ring-sky-400 focus:outline-none"
          placeholder="Enter clinical notes..."
          value={notesDraft}
          onChange={(e) => onChangeNotes(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
            Close
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className={`px-4 py-2 rounded-lg text-white ${
              saving ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {saving ? "Saving..." : "Save Notes"}
          </button>
        </div>
      </div>
    </div>
  );
}
