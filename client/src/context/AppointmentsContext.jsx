import { createContext, useContext } from "react";

export const AppointmentsContext = createContext(null);

export function useAppointments() {
  const ctx = useContext(AppointmentsContext);
  if (!ctx) {
    throw new Error(
      "useAppointments must be used within an AppointmentsProvider"
    );
  }
  return ctx;
}
