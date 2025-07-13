'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Doctor Login</h1>

        <form onSubmit={handleManualLogin} className="form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="divider">or</p>

        <button onClick={handleGoogleLogin} className="google-button">
          Sign in with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don't have an account?{' '}
          <a href="/signup" className="signup-link">
            Sign up manually
          </a>
        </p>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #f9f9f9;
          padding: 1rem;
        }
        .login-box {
          width: 100%;
          max-width: 400px;
          background: white;
          padding: 2rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        h1 {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        input {
          padding: 0.8rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .error {
          color: red;
          font-size: 0.9rem;
          text-align: center;
        }
        button {
          padding: 0.8rem;
          font-size: 1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #aaa;
        }
        .divider {
          text-align: center;
          margin: 1rem 0;
          font-weight: bold;
        }
        .google-button {
          width: 100%;
          padding: 0.8rem;
          font-size: 1rem;
          background-color: #db4437;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .signup-link {
          color: #0070f3;
          text-decoration: none;
        }
        .signup-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-box {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
