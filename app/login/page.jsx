'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login as Doctor</h2>
        <p>Use your Google account to continue</p>
        <button onClick={handleLogin}>Sign in with Google</button>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f0f4f8;
        }
        .login-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }
        h2 {
          margin-bottom: 1rem;
          color: #333;
        }
        p {
          margin-bottom: 1.5rem;
        }
        button {
          background: #0070f3;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
        }
        button:hover {
          background: #005bb5;
        }
        @media (max-width: 500px) {
          .login-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
