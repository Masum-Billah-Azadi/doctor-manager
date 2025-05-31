'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPatientPage() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
    medicalHistory: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('../../api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Failed to add patient');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h1>Add New Patient</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required /><br />
        <input name="age" placeholder="Age" type="number" onChange={handleChange} required /><br />
        <input name="gender" placeholder="Gender" onChange={handleChange} required /><br />
        <input name="contact" placeholder="Contact" onChange={handleChange} required /><br />
        <input name="address" placeholder="Address" onChange={handleChange} required /><br />
        <textarea name="medicalHistory" placeholder="Medical History" onChange={handleChange} required /><br />
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
}
