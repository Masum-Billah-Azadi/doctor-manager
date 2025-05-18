// pages/login.js
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      // Fake session
      localStorage.setItem('doctor', JSON.stringify({ name: data.name, id: data.doctorId }));
      alert('Login successful');
      router.push('/dashboard');
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <h1>Doctor Login</h1>
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}
