import React, { useState } from "react";
import { API_BASE_URL } from "../apiConfig";
import toast from "react-hot-toast";

export default function RescheduleModal({ appointment, onClose, onUpdate }) {
  const [newDate, setNewDate] = useState(
    appointment.datetime?.slice(0,16)
  );
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);

    const token = localStorage.getItem("doctor_token");

    const res = await fetch(
      `${API_BASE_URL}/api/appointments/${appointment.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({
          datetime: newDate
        })
      }
    );

    if (!res.ok) {
      toast.error("Reschedule failed");
      setSaving(false);
      return;
    }

    const updated = await res.json();
    onUpdate(updated);

    toast.success("Appointment rescheduled");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[320px] space-y-4">

        <h3 className="text-lg font-semibold">
          Reschedule Appointment
        </h3>

        <input
          type="datetime-local"
          className="w-full border rounded p-2"
          value={newDate}
          onChange={(e)=>setNewDate(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={save}
            className="flex-1 py-2 bg-[#2EA3DD] text-white rounded"
          >
            {saving ? "Saving…" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
