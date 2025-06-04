'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditPatientPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    condition: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      const res = await fetch(`/api/patients/${id}`);
      const data = await res.json();
      setForm({
        name: data.name || '',
        age: data.age || '',
        gender: data.gender || '',
        condition: data.condition || '',
      });
      setLoading(false);
    };

    if (id) fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/patients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push(`/patient/${id}`);
    } else {
      alert('Update failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>Edit Patient</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <br /><br />
        <label>Age:</label>
        <input name="age" type="number" value={form.age} onChange={handleChange} required />
        <br /><br />
        <label>Gender:</label>
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">-- Select --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br /><br />
        <label>Condition:</label>
        <input name="condition" value={form.condition} onChange={handleChange} required />
        <br /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
