// PastAppointments.jsx
import React, { useState } from "react";

const initialPast = [
  { id:1, name:"Emily Johnson", phone:"+254701234567", location:"KNH", datetime:"2025-11-20T09:00", notes:"Lower back pain recovery" },
  { id:2, name:"Mark Lee", phone:"+254712345678", location:"Tender Touch Clinic", datetime:"2025-11-18T11:00", notes:"Sports injury rehab" },
];

export default function PastAppointments(){
  const [past] = useState(initialPast);

  const exportCSV = () => {
    const csv = [
      ["Patient","Phone","Location","DateTime","Notes"],
      ...past.map(p => [p.name, p.phone, p.location, p.datetime, p.notes])
    ].map(row => row.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");

    const blob = new Blob([csv], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "past_appointments.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Past Appointments</h2>
        <button onClick={exportCSV} className="px-3 py-2 rounded bg-[#2EA3DD] text-white">Export CSV</button>
      </div>

      <div className="grid gap-3">
        {past.map(p => (
          <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold">{p.name} <span className="text-sm text-gray-500">({p.phone})</span></h4>
                <p className="text-sm text-gray-500">{p.location} • {new Date(p.datetime).toLocaleString()}</p>
              </div>
            </div>
            <p className="mt-3 text-gray-700 dark:text-gray-300">{p.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
