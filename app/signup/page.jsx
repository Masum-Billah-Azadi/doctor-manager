'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const validatePhone = (phone) => /^01[3-9]\d{8}$/.test(phone); // Bangladesh format

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(form.phone)) return setError('Invalid phone number format');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');

    try {
      const res = await fetch('/api/manual-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/api/auth/signin'); // auto-login handled in API route or show success
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="container">
      <h2>Doctor Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" name="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="text" name="phone" placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <input type="password" name="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Signup</button>
      </form>

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: auto;
          padding: 2rem;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .error {
          color: red;
        }
      `}</style>
    </div>
  );
}
