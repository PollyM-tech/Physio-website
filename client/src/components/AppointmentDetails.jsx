import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function AppointmentDetails() {
  const { id } = useParams();
  const appt = useQuery(api.appointments.getAppointment, { id });
  const loading = appt === undefined;

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading appointment details...
      </p>
    );
  }

  if (!appt) {
    return (
      <p className="text-center mt-10 text-red-500 font-medium">
        Appointment not found.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6 p-4">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 flex items-center gap-6">
        <div className="text-indigo-500 text-4xl">👤</div>
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">
            {appt.name || "Unnamed patient"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Appointment ID: {appt._id}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Status:{" "}
            <span className="font-semibold">{appt.status || "Pending"}</span>
          </p>
        </div>
      </div>

      {/* Contact & Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard icon="📞" label="Phone" value={appt.phone || "—"} />
        <InfoCard icon="✉️" label="Email" value={appt.email || "—"} />
        <InfoCard icon="📍" label="Location" value={appt.location || "—"} />
        <InfoCard
          icon="🕒"
          label="Scheduled At"
          value={
            appt.scheduledAt
              ? new Date(appt.scheduledAt).toLocaleString()
              : "—"
          }
        />
      </div>

      {/* Message */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Patient Message
        </h2>
        <p className="text-gray-600">
          {appt.message || "No additional message provided."}
        </p>
      </div>

      {/* Doctor Notes */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Doctor Notes
        </h2>
        {appt.doctorNotes ? (
          <p className="text-gray-600 whitespace-pre-line">{appt.doctorNotes}</p>
        ) : (
          <p className="text-gray-400 italic">No notes recorded yet.</p>
        )}
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl hover:shadow-lg transition">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-700">{value}</p>
      </div>
    </div>
  );
}
