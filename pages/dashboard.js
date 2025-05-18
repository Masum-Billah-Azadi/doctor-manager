// pages/dashboard.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem('doctor'));
    if (!doctor) {
      router.push('/login'); // redirect if not logged in
    }
  }, [router]);

  const goTo = (path) => router.push(path);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Doctor Dashboard</h1>

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={() => goTo('/add-patient')}>➕ Add New Patient</button>
        <button onClick={() => goTo('/patients')}>📄 View Patient List</button>
        <button onClick={() => goTo('/profile')}>👤 Doctor Profile</button>
      </div>
    </div>
  );
}
