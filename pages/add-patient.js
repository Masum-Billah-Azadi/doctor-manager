// pages/add-patient.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddPatient() {
  const [form, setForm] = useState({ name: '', age: '', contact: '', medicine: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) router.push('/patients');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Age" type="number" onChange={e => setForm({ ...form, age: e.target.value })} />
      <input placeholder="Contact" onChange={e => setForm({ ...form, contact: e.target.value })} />
      <input placeholder="Medicine" onChange={e => setForm({ ...form, medicine: e.target.value })} />
      <button type="submit">Add Patient</button>
    </form>
  );
}
