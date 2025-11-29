// src/context/AppointmentsContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";

const AppointmentsContext = createContext(null);

export function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Jane Doe",
      phone: "+254712345678",
      location: "Tender Touch Clinic",
      datetime: "2025-11-28T10:00",
      message: "Lower back pain for 2 weeks",
      status: "Pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "John Smith",
      phone: "+254701234567",
      location: "House Call",
      datetime: "2025-11-29T14:30",
      message: "Knee pain after jogging",
      status: "Pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Alice",
      phone: "+254700000001",
      location: "Kenyatta National Hospital (KNH)",
      datetime: "2025-11-25T09:00",
      message: "Shoulder pain",
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    },
  ]);

  // "now" tick so expired → past automatically
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000); // every minute
    return () => clearInterval(id);
  }, []);

  const { upcomingAppointments, pastAppointments, stats } = useMemo(() => {
    const nowTime = now.getTime();
    const upcoming = [];
    const past = [];

    for (const appt of appointments) {
      const t = new Date(appt.datetime).getTime();
      if (Number.isNaN(t)) {
        upcoming.push(appt); // fallback
      } else if (t >= nowTime) {
        upcoming.push(appt);
      } else {
        past.push(appt);
      }
    }

    const pending = upcoming.filter((a) => a.status === "Pending").length;
    const confirmed = upcoming.filter((a) => a.status === "Confirmed").length;
    const rescheduled = upcoming.filter(
      (a) => a.status === "Rescheduled"
    ).length;

    return {
      upcomingAppointments: upcoming,
      pastAppointments: past,
      stats: {
        total: appointments.length,
        pending,
        confirmed,
        rescheduled,
      },
    };
  }, [appointments, now]);

  const addAppointment = (data) => {
    setAppointments((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        status: "Pending",
        createdAt: new Date().toISOString(),
        ...data,
      },
    ]);
  };

  const updateAppointment = (id, updates) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, ...updates } : appt))
    );
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        upcomingAppointments,
        pastAppointments,
        stats,
        addAppointment,
        updateAppointment,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  const ctx = useContext(AppointmentsContext);
  if (!ctx) {
    throw new Error("useAppointments must be used within AppointmentsProvider");
  }
  return ctx;
}
