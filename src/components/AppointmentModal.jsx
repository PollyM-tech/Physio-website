import React, { useState } from "react";

export default function AppointmentModal({ appointment, onClose, onConfirm, onReschedule }) {
  const [newDateTime, setNewDateTime] = useState(appointment.datetime);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-xl font-bold text-[#2EA3DD] mb-4">{appointment.name}</h3>
        <p className="mb-2">Location: {appointment.location}</p>
        <p className="mb-2">Message: {appointment.message}</p>
        <p className="mb-4">Status: {appointment.status}</p>

        <label className="block text-sm font-medium mb-1">Reschedule Date & Time:</label>
        <input
          type="datetime-local"
          value={newDateTime}
          onChange={(e) => setNewDateTime(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4 dark:bg-gray-700"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">Cancel</button>
          <button onClick={() => onReschedule(appointment.id, newDateTime)} className="px-4 py-2 rounded bg-yellow-500 text-white">Reschedule</button>
          <button onClick={() => onConfirm(appointment.id)} className="px-4 py-2 rounded bg-green-600 text-white">Confirm</button>
        </div>
      </div>
    </div>
  );
}
