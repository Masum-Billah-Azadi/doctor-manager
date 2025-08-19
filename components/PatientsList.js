// components/PatientsList.js
import { useRouter } from 'next/router';

export default function PatientsList({ patients }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (confirm('Delete this patient?')) {
      await fetch(`/api/patients/${id}`, { method: 'DELETE' });
      router.reload();
    }
  };

  return (
    <ul>
      {patients.map((patient) => (
        <li key={patient._id}>
          <strong>{patient.name}</strong> - {patient.age} years old
          <div>
            <button onClick={() => router.push(`/patients/${patient._id}`)}>View</button>
            <button onClick={() => router.push(`/patients/${patient._id}/edit`)}>Edit</button>
            <button onClick={() => handleDelete(patient._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
