import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";

export default function RescheduleModal({ appointment, onClose }) {
  // Pre-fill with existing scheduledAt converted to datetime-local format
  const toLocalInput = (ms) => {
    if (!ms) return "";
    const d = new Date(ms);
    // datetime-local needs "YYYY-MM-DDTHH:mm"
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const [newDate, setNewDate] = useState(toLocalInput(appointment.scheduledAt));
  const [saving, setSaving] = useState(false);
  const updateAppointment = useMutation(api.appointments.updateAppointment);

  const save = async () => {
    if (!newDate) return toast.error("Please pick a date and time");
    setSaving(true);
    try {
      await updateAppointment({
        id: appointment._id,
        status: "Rescheduled",
        scheduledAt: new Date(newDate).getTime(),
      });
      toast.success("Appointment rescheduled");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Reschedule failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[320px] space-y-4">
        <h3 className="text-lg font-semibold">Reschedule Appointment</h3>

        <input
          type="datetime-local"
          className="w-full border rounded p-2"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2 border rounded">
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
