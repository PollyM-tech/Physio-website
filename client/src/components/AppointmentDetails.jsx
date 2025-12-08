import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";
import toast from "react-hot-toast";

export default function AppointmentDetails() {
  const { id } = useParams();
  const [appt, setAppt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      const token = localStorage.getItem("doctor_token");
      if (!token) {
        toast.error("You must be logged in to view appointment details.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 404) {
          toast.error("Appointment not found.");
          setAppt(null);
          return;
        }

        if (!res.ok) {
          toast.error("Failed to fetch appointment details.");
          setAppt(null);
          return;
        }

        const data = await res.json();
        setAppt(data);
      } catch (err) {
        console.error(err);
        toast.error("An unexpected error occurred.");
        setAppt(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading appointment details...
      </p>
    );

  if (!appt)
    return (
      <p className="text-center mt-10 text-red-500 font-medium">
        Appointment not found.
      </p>
    );

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
            Appointment ID: {appt.id}
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
          value={appt.datetime ? new Date(appt.datetime).toLocaleString() : "—"}
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
        {appt.doctor_notes ? (
          <p className="text-gray-600 whitespace-pre-line">
            {appt.doctor_notes}
          </p>
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
