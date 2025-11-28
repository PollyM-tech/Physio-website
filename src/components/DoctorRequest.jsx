import React, { useState, useMemo } from "react";
import AppointmentModal from "./AppointmentModal";
import toast from "react-hot-toast";

const initial = [
  { id:1, name:"Jane Doe", phone:"+254712345678", location:"Tender Touch Clinic", datetime:"2025-11-28T10:00", message:"Lower back pain", status:"Pending"},
  { id:2, name:"John Smith", phone:"+254701234567", location:"House Call", datetime:"2025-11-29T14:30", message:"Knee pain", status:"Pending"},
  { id:3, name:"Alice", phone:"+2547...", location:"KNH", datetime:"2025-11-25T09:00", message:"Shoulder pain", status:"Confirmed"},
];

export default function DoctorRequests() {
  const [requests, setRequests] = useState(initial);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return requests.filter(r => {
      if (status !== "all" && r.status !== status) return false;
      if (q && !r.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (from && new Date(r.datetime) < new Date(from)) return false;
      if (to && new Date(r.datetime) > new Date(to)) return false;
      return true;
    });
  }, [requests, q, status, from, to]);

  const confirm = (id) => {
    setRequests(s => s.map(r => r.id === id ? { ...r, status: "Confirmed" } : r));
    toast.success("Appointment confirmed");
  };

  const reschedule = (id, newDateTime) => {
    setRequests(s => s.map(r => r.id === id ? { ...r, datetime: newDateTime || r.datetime, status: "Rescheduled" } : r));
    toast.success("Appointment rescheduled");
  };

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
        {filtered.map(r => (
          <div key={r.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{r.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-300">{r.location} • {new Date(r.datetime).toLocaleString()}</p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{r.message}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-sm px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900/30">{r.status}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => confirm(r.id)}
                  className={`px-3 py-1 rounded text-white ${
                    r.status === "Confirmed" || r.status === "Rescheduled"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  disabled={r.status === "Confirmed" || r.status === "Rescheduled"}
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
          onConfirm={(id) => { confirm(id); setSelected(null); }}
          onReschedule={(id, newDateTime) => { reschedule(id, newDateTime); setSelected(null); }}
        />
      )}
    </div>
  );
}
