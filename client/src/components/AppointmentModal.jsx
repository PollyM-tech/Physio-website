import React, { useState } from "react";

function toLocalInput(ms) {
  if (!ms) return "";
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * Modal used in DoctorRequest — shows appointment info with
 * confirm and reschedule actions.
 */
export default function AppointmentModal({ appointment, onClose, onConfirm, onReschedule }) {
  const [newDateTime, setNewDateTime] = useState(
    toLocalInput(appointment.scheduledAt)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-6 shadow-xl overflow-y-auto max-h-[90vh] space-y-3">
        <h3 className="text-xl font-bold text-indigo-600 truncate">{appointment.name}</h3>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Phone:</strong> {appointment.phone}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Location:</strong> {appointment.location}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Scheduled:</strong>{" "}
          {appointment.scheduledAt
            ? new Date(appointment.scheduledAt).toLocaleString()
            : "No date"}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Status:</strong> {appointment.status}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Message:</strong> {appointment.message || "No message"}
        </p>

        {/* Reschedule picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Reschedule to:
          </label>
          <input
            type="datetime-local"
            className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700"
            value={newDateTime}
            onChange={(e) => setNewDateTime(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm"
          >
            Close
          </button>
          <button
            onClick={() => onConfirm(appointment._id)}
            disabled={appointment.status === "Confirmed"}
            className={`px-4 py-2 rounded-lg text-white text-sm ${
              appointment.status === "Confirmed"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Confirm
          </button>
          <button
            onClick={() => onReschedule(appointment._id, newDateTime)}
            className="px-4 py-2 rounded-lg text-white text-sm bg-[#2EA3DD] hover:bg-[#0f5e93]"
          >
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
}
