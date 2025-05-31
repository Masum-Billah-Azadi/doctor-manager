'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PatientDetailPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // Simulate fetch patient by ID
    setPatient({ id, name: `Patient #${id}`, age: 30, condition: 'Healthy' });
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Patient Detail</h1>
      <p><strong>ID:</strong> {patient.id}</p>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Condition:</strong> {patient.condition}</p>
    </div>
  );
}
