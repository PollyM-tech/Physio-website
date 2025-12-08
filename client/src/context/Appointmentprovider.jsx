import React, { useState, useEffect, useMemo } from "react";
import { AppointmentsContext } from "./AppointmentsContext";

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

  // Track current time for past/upcoming split
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const { upcomingAppointments, pastAppointments, stats } = useMemo(() => {
    const nowTime = now.getTime();
    const upcoming = [];
    const past = [];

    for (const appt of appointments) {
      const t = new Date(appt.datetime).getTime();
      if (Number.isNaN(t) || t >= nowTime) upcoming.push(appt);
      else past.push(appt);
    }

    const pending = upcoming.filter((a) => a.status === "Pending").length;
    const confirmed = upcoming.filter((a) => a.status === "Confirmed").length;
    const rescheduled = upcoming.filter((a) => a.status === "Rescheduled").length;

    return {
      upcomingAppointments: upcoming,
      pastAppointments: past,
      stats: { total: appointments.length, pending, confirmed, rescheduled },
    };
  }, [appointments, now]);

  // CRUD operations
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

  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
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
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}
