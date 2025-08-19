"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function DoctorAppointmentsPage() {
  const { data: session } = useSession();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetch(`/api/appointment/doctor/${session.user.id}`)
      .then((r) => r.json())
      .then((d) => setList(Array.isArray(d) ? d : []))
      .catch(() => setList([]));
  }, [session]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/appointment/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setList((prev) => prev.map((x) => (x._id === id ? { ...x, status } : x)));
    } else {
      alert("Failed to update");
    }
  };

  const convertToPatient = async (id) => {
    const res = await fetch(`/api/appointment/${id}/convert`, { method: "POST" });
    const data = await res.json();
    if (res.ok) {
      alert("Added to Patients List");
    } else {
      alert(data.error || "Failed to convert");
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "2rem auto", padding: "1rem" }}>
      <h2>Appointments</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {list.map((a) => (
          <li key={a._id} style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div><strong>Patient:</strong> {a.patientUser?.name} ({a.patientUser?.phone})</div>
                <div><strong>Preferred:</strong> {new Date(a.preferredDateTime).toLocaleString()}</div>
                {a.reason ? <div><strong>Reason:</strong> {a.reason}</div> : null}
                <div><strong>Status:</strong> {a.status}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "start" }}>
                <button onClick={() => updateStatus(a._id, "accepted")}>Accept</button>
                <button onClick={() => updateStatus(a._id, "rejected")}>Reject</button>
                <button disabled={a.status !== "accepted"} onClick={() => convertToPatient(a._id)}>
                  Add to Patients
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
