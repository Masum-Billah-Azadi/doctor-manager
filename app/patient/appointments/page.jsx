"use client";
import { useEffect, useState } from "react";

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("/api/patient/appointments")
      .then(res => res.json())
      .then(data => {
        if (data.appointments) setAppointments(data.appointments);
      });
  }, []);

  return (
    <div>
      <h1>My Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map(appt => (
            <li key={appt._id}>
              {appt.date} with {appt.doctor?.name} ({appt.reason})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
