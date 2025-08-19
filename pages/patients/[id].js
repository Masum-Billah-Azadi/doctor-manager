// pages/patients/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PatientDetails() {
  const { query: { id } } = useRouter();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/patients/${id}`).then(res => res.json()).then(setPatient);
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div>
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Contact:</strong> {patient.contact}</p>
      <p><strong>Medicine:</strong> {patient.medicine}</p>
    </div>
  );
}
