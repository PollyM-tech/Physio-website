import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";
import toast from "react-hot-toast";

export default function PatientProfile() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      const token = localStorage.getItem("doctor_token");
      if (!token) {
        toast.error("You must be logged in to view patient details.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.status === 404) {
          toast.error("Patient not found.");
          setPatient(null);
          return;
        }

        if (!res.ok) {
          toast.error("Failed to fetch patient profile.");
          setPatient(null);
          return;
        }

        const data = await res.json();
        if (!data || Object.keys(data).length === 0) {
          toast.error("Patient data is empty.");
          setPatient(null);
          return;
        }

        setPatient(data);
      } catch (err) {
        console.error(err);
        toast.error("An unexpected error occurred.");
        setPatient(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading patient profile...</p>;

  if (!patient)
    return <p className="text-center mt-10 text-red-500 font-medium">Patient not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6 p-4">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 flex items-center gap-6">
        <div className="text-indigo-500 text-4xl">👤</div>
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">{patient.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Patient ID: {patient.id}</p>
        </div>
      </div>

      {/* Contact & Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard icon="📞" label="Phone" value={patient.phone || "—"} />
        <InfoCard icon="✉️" label="Email" value={patient.email || "—"} />
        <InfoCard icon="📍" label="Location" value={patient.location || "—"} />
        <InfoCard icon="🎂" label="DOB" value={patient.dob || "—"} />
      </div>

      {/* Medical Notes */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Medical Notes</h2>
        {patient.medical_notes ? (
          <p className="text-gray-600 whitespace-pre-line">{patient.medical_notes}</p>
        ) : (
          <p className="text-gray-400 italic">No medical notes available.</p>
        )}
      </div>
    </div>
  );
}

/* ===================================================== */
/* Info Card Component */
/* ===================================================== */
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
