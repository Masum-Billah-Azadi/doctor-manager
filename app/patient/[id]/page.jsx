"use client";

import Link from 'next/link';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PatientDetailsPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetch(`/api/patients/${id}`)
      .then((res) => res.json())
      .then((data) => setPatient(data))
      .catch((err) => console.error("Failed to fetch patient:", err));
  }, [id]);

  if (!patient) return <div>Loading patient details...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Condition:</strong> {patient.condition}</p>
      <Link href={`/patient/${id}/edit`}><button>Edit Patient</button></Link>
    </div>
  );
}
