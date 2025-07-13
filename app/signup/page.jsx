'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple client-side validations
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!/^\d{10,15}$/.test(form.phone)) {
      setError('Invalid phone number format');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/manual-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        // Auto-login
        const login = await signIn('credentials', {
          redirect: false,
          email: form.email,
          password: form.password,
        });

        if (login?.ok) {
          router.push('/dashboard');
        } else {
          setError('Auto-login failed. Try logging in manually.');
        }
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Doctor Sign Up</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          inputMode="numeric"
          pattern="\d{10,15}"
          value={form.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#0070f3', textDecoration: 'underline' }}>
            Login here
          </Link>
        </p>
      </form>

      <style jsx>{`
        @media (max-width: 600px) {
          div {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: 'auto',
    marginTop: '5rem',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 500,
  },
};
