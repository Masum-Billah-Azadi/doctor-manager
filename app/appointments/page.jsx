"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AppointmentsLanding() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("/api/doctor/list")
      .then((r) => r.json())
      .then(setDoctors)
      .catch(() => setDoctors([]));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
      <h2>Choose a Doctor</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {doctors.map((d) => (
          <li key={d._id} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem", borderBottom: "1px solid #eee" }}>
            <span>
              <strong>{d.name}</strong> {d.specialty ? `— ${d.specialty}` : ""}
            </span>
            <Link href={`/appointment/${d._id}`} style={{ textDecoration: "underline" }}>Book Appointment</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
