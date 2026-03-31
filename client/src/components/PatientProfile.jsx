import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";

import {
  Phone,
  Mail,
  MapPin,
  Cake,
  FileText,
  User,
  Pencil,
  HeartPulse,
  Calendar,
  Download,
  Upload,
} from "lucide-react";

export default function PatientProfile() {
  const { id } = useParams();
  const [editing, setEditing] = useState(false);

  const patient = useQuery(api.patients.getPatient, { id });
  const loading = patient === undefined;

  if (loading) return <SkeletonLoader />;

  if (!patient) {
    return (
      <div className="text-center text-red-500 font-semibold mt-20">
        Patient not found
      </div>
    );
  }

  const vitals = patient.vitals || {
    "Pain Level": "3 / 10",
    Mobility: "72%",
    BP: "118 / 78",
    Pulse: "74 bpm",
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-sky-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* QUICK BAR */}
        <div className="flex flex-wrap justify-end gap-3">
          <ActionButton icon={Pencil} label="Edit Profile" onClick={() => setEditing(true)} />
          <ActionButton icon={Download} label="Export PDF" />
          <ActionButton icon={Upload} label="Upload Docs" />
        </div>

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="h-20 w-20 flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-blue-500 text-white rounded-full shadow-lg">
            <User size={36} />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-indigo-700">{patient.name}</h1>
            <p className="text-gray-500">ID: {patient._id}</p>
          </div>
        </div>

        {/* CORE INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <InfoCard icon={Phone} label="Phone" value={patient.phone} />
          <InfoCard icon={Mail} label="Email" value={patient.email} />
          <InfoCard icon={MapPin} label="Location" value={patient.location} />
          <InfoCard icon={Cake} label="DOB" value={patient.dob} />
        </div>

        {/* VITALS */}
        <Panel title="Vitals" icon={HeartPulse}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {Object.entries(vitals).map(([label, value]) => (
              <Vital key={label} label={label} value={value} />
            ))}
          </div>
        </Panel>

        {/* APPOINTMENTS — placeholder until sessions endpoint is added */}
        <Panel title="Appointments" icon={Calendar}>
          <p className="italic text-gray-400">No appointment history yet.</p>
        </Panel>

        {/* TREATMENT SESSIONS */}
        <Panel title="Treatment Sessions" icon={FileText}>
          <p className="italic text-gray-400">No treatment sessions logged.</p>
        </Panel>

        {/* NOTES */}
        <Panel title="Medical Notes" icon={FileText}>
          <p className="text-gray-700 whitespace-pre-line">
            {patient.medicalNotes || "No notes added yet."}
          </p>
        </Panel>
      </div>

      {editing && <EditModal patient={patient} setEditing={setEditing} />}
    </div>
  );
}

/* ─── Sub-components ──────────────────────────────────── */

function Panel({ title, icon, children }) {
  const Icon = icon;
  return (
    <div className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl rounded-3xl px-6 py-5">
      <header className="flex items-center gap-3 mb-5 text-indigo-700">
        <Icon size={22} />
        <h2 className="text-xl font-bold">{title}</h2>
      </header>
      {children}
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  const Icon = icon;
  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-md hover:shadow-xl rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
      <div className="flex gap-4 items-center">
        <div className="p-3 bg-gradient-to-tr from-indigo-500 to-blue-500 text-white rounded-xl">
          <Icon size={18} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
          <p className="font-semibold text-gray-800">{value || "—"}</p>
        </div>
      </div>
    </div>
  );
}

function Vital({ label, value }) {
  return (
    <div className="bg-indigo-50 rounded-xl p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-indigo-700">{value}</p>
    </div>
  );
}

function ActionButton({ icon, label, onClick }) {
  const Icon = icon;
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition"
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

function EditModal({ patient, setEditing }) {
  const [form, setForm] = useState({
    name: patient.name || "",
    phone: patient.phone || "",
    email: patient.email || "",
  });
  const updatePatient = useMutation(api.patients.updatePatient);

  const updateField = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    try {
      await updatePatient({ id: patient._id, ...form });
      toast.success("Profile updated");
      setEditing(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-xl">
        <h3 className="text-xl font-bold text-indigo-600 mb-4">Edit Patient</h3>
        <div className="grid gap-3">
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="Name"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={updateField}
            placeholder="Phone"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            name="email"
            value={form.email}
            onChange={updateField}
            placeholder="Email"
            type="email"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex justify-end gap-3 mt-5 flex-wrap">
          <button onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-200 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="h-24 w-full bg-gray-200 rounded-xl"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}
