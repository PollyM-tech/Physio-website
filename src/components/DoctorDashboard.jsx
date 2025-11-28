// DoctorDashboardMain.jsx
import React, { useState, useMemo } from "react";

const initialRequests = [
  {
    id: 1,
    name: "Jane Doe",
    phone: "+254712345678",
    location: "Tender Touch Clinic",
    datetime: "2025-11-28T10:00",
    message: "Lower back pain for 2 weeks",
    status: "Pending",
  },
  {
    id: 2,
    name: "John Smith",
    phone: "+254701234567",
    location: "House Call",
    datetime: "2025-11-29T14:30",
    message: "Knee pain after jogging",
    status: "Pending",
  },
  {
    id: 3,
    name: "Alice",
    phone: "+254700000000",
    location: "KNH",
    datetime: "2025-11-25T09:00",
    message: "Shoulder pain",
    status: "Confirmed",
  },
];

export default function DoctorDashboardMain() {
  const [requests] = useState(initialRequests);

  // Calculate stats
  const stats = useMemo(() => {
    const pending = requests.filter(r => r.status === "Pending").length;
    const confirmed = requests.filter(r => r.status === "Confirmed").length;
    const rescheduled = requests.filter(r => r.status === "Rescheduled").length;
    return { pending, confirmed, rescheduled, total: requests.length };
  }, [requests]);

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
