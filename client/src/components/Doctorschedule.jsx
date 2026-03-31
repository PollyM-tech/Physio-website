import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import WeeklyCalendar from "./WeeklyCalendar";
import RescheduleModal from "./RescheduleModal";

export default function DoctorSchedule() {
  const navigate = useNavigate();
  const [reschedule, setReschedule] = useState(null);

  const appointments = useQuery(api.appointments.listAppointments);
  const loading = appointments === undefined;

  const today = useMemo(() => {
    if (!appointments) return [];
    const nowStr = new Date().toDateString();
    return appointments.filter(
      (a) => a.scheduledAt && new Date(a.scheduledAt).toDateString() === nowStr
    );
  }, [appointments]);

  const upcoming = useMemo(() => {
    if (!appointments) return [];
    const now = Date.now();
    return appointments
      .filter((a) => a.scheduledAt && a.scheduledAt > now)
      .sort((a, b) => a.scheduledAt - b.scheduledAt);
  }, [appointments]);

  if (loading) return <SkeletonLoader />;

  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700">Doctor Schedule</h1>
          <p className="text-sm text-gray-500">
            Manage your patients & upcoming visits
          </p>
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 mt-2 sm:mt-0">
          {today.length} Appointments Today
        </span>
      </div>

      {/* Today's Appointments */}
      <Section title="Today's Visits" items={today} onReschedule={setReschedule} navigate={navigate} />

      {/* Weekly Calendar */}
      <section>
        <h2 className="font-semibold mb-3">Weekly Calendar</h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming appointments.</p>
        ) : (
          <div className="overflow-x-auto">
            <WeeklyCalendar appointments={upcoming} />
          </div>
        )}
      </section>

      {/* Upcoming Appointments */}
      <Section title="Upcoming Appointments" items={upcoming} onReschedule={setReschedule} navigate={navigate} />

      {/* Reschedule Modal */}
      {reschedule && (
        <RescheduleModal
          appointment={reschedule}
          onClose={() => setReschedule(null)}
        />
      )}
    </div>
  );
}

function Section({ title, items, onReschedule, navigate }) {
  return (
    <section>
      <h2 className="font-semibold mb-3">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No appointments.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((a) => (
            <AppointmentCard
              key={a._id}
              a={a}
              navigate={navigate}
              onReschedule={() => onReschedule(a)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function AppointmentCard({ a, navigate, onReschedule }) {
  const dateStr = a.scheduledAt
    ? new Date(a.scheduledAt).toLocaleString()
    : "No date";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-lg transition border border-gray-200 dark:border-gray-700 flex flex-col justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-bold truncate">{a.name}</h3>
        <p className="text-sm text-gray-500">{dateStr}</p>
        <p className="text-sm truncate">{a.location}</p>
        <span
          className={`mt-2 inline-block px-2 py-1 text-xs font-medium rounded-full ${
            a.status === "Confirmed"
              ? "bg-green-100 text-green-700"
              : a.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {a.status}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
        <button
          onClick={() => navigate(`/doctor/appointments/${a._id}`)}
          className="flex-1 sm:flex-none py-2 px-4 text-sm rounded border hover:bg-gray-50 text-center"
        >
          View Details
        </button>
        <button
          onClick={onReschedule}
          className="flex-1 sm:flex-none py-2 px-4 text-sm rounded text-white bg-[#2EA3DD] hover:bg-[#0f5e93] text-center"
        >
          Reschedule
        </button>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-6 p-4 animate-pulse">
      <div className="h-8 w-1/2 bg-gray-200 rounded-md"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}
