// pages/patients/index.js
import PatientsList from '@/components/PatientsList';

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/patients`);
  const patients = await res.json();

  return { props: { patients } };
}

export default function PatientsPage({ patients }) {
  return (
    <div>
      <h1>Patients</h1>
      <PatientsList patients={patients} />
    </div>
  );
}
