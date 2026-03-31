import React, { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function DoctorDashboardMain() {
  const requests = useQuery(api.appointments.listAppointments);
  const loading = requests === undefined;

  const stats = useMemo(() => {
    if (!requests) return { pending: 0, confirmed: 0, rescheduled: 0, total: 0 };
    const pending = requests.filter((r) => r.status === "Pending").length;
    const confirmed = requests.filter((r) => r.status === "Confirmed").length;
    const rescheduled = requests.filter((r) => r.status === "Rescheduled").length;
    return { pending, confirmed, rescheduled, total: requests.length };
  }, [requests]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading dashboard overview...</p>;
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
