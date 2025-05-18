// pages/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [form, setForm] = useState({ name: '', phone: '', password: '', confirmPassword: '' });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Signup successful!');
      router.push('/dashboard');
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <h1>Doctor Signup</h1>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
