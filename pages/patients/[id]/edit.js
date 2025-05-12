// pages/patients/[id]/edit.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditPatient() {
  const { query: { id }, push } = useRouter();
  const [form, setForm] = useState({ name: '', age: '', contact: '', medicine: '' });

  useEffect(() => {
    if (!id) return;
    fetch(`/api/patients/${id}`).then(res => res.json()).then(setForm);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/patients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    push('/patients');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input value={form.age} type="number" onChange={e => setForm({ ...form, age: e.target.value })} />
      <input value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
      <input value={form.medicine} onChange={e => setForm({ ...form, medicine: e.target.value })} />
      <button type="submit">Update</button>
    </form>
  );
}
