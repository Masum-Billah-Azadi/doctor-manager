"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BookAppointmentPage() {
  const { doctorId } = useParams();
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({ reason: "", preferredDateTime: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/patient-auth/me").then(r => r.json()).then(d => setMe(d.user));
    fetch(`/api/doctor/list`).then(r=>r.json()).then(list=>{
      setDoctor(list.find(x => x._id === doctorId) || null);
    });
  }, [doctorId]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!me) {
      alert("Please login as patient to book.");
      router.push("/patient/login");
      return;
    }
    if (!form.preferredDateTime) {
      setError("Please choose date & time");
      return;
    }

    const res = await fetch("/api/appointment/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId, ...form }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Appointment requested!");
      router.push("/patient/appointments");
    } else {
      setError(data.error || "Failed to book");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <h2>Book Appointment {doctor ? `with ${doctor.name}` : ""}</h2>
      {!me && (
        <p style={{ background: "#fff6e5", padding: "0.5rem 0.75rem", borderRadius: 6 }}>
          Not logged in. <a href="/patient/login" style={{ textDecoration: "underline" }}>Login</a> or{" "}
          <a href="/patient/signup" style={{ textDecoration: "underline" }}>Create account</a>
        </p>
      )}
      <form onSubmit={submit} style={{ display: "grid", gap: "0.75rem" }}>
        <input
          placeholder="Reason (optional)"
          value={form.reason}
          onChange={(e) => setForm((s) => ({ ...s, reason: e.target.value }))}
        />
        <input
          type="datetime-local"
          value={form.preferredDateTime}
          onChange={(e) => setForm((s) => ({ ...s, preferredDateTime: e.target.value }))}
          required
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button>Request Appointment</button>
      </form>
    </div>
  );
}
