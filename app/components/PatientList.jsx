"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientList() {
  const { data: session } = useSession();
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/patients`)
        .then((res) => res.json())
        .then((data) => setPatients(data.reverse())); // show latest first
    }
  }, [session]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this patient?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/patients/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Remove deleted patient from local state
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } else {
      alert("Failed to delete patient.");
    }
  };

  const handleEdit = (id) => {
    router.push(`/patient/${id}`);
  };

  if (!session) return null;

  return (
    <div style={{ padding: "1rem", flex: 1 }}>
      <h2>Patients</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {patients.map((patient) => (
          <li key={patient._id} style={{ margin: "1rem 0", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ flex: 1 }}>
              #{patient.patientNumber} - {patient.name}
            </span>
            <button onClick={() => handleEdit(patient._id)} style={{ padding: "0.3rem 0.6rem", cursor: "pointer" }}>
              Edit
            </button>
            <button
              onClick={() => handleDelete(patient._id)}
              style={{ padding: "0.3rem 0.6rem", backgroundColor: "#f44336", color: "white", cursor: "pointer" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
