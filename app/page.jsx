'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    // } else if (status === 'unauthenticated') {
    //   router.push('/login');
    // }
    }
  }, [status, router]);

  return (
    <main className="homepage">
      <div className="overlay">
        <h1>Welcome to DoctorCare</h1>
        <p>Your secure and smart way to manage patients.</p>
        <a href="/login" className="login-btn">Get Started</a>
      </div>

      <style jsx>{`
        .homepage {
          background-image: url('/bg-home.jpg'); /* Put your image in public/bg-home.jpg */
          background-size: cover;
          background-position: center;
          height: 100vh;
          width: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .overlay {
          background: rgba(0, 0, 0, 0.5); /* Dark overlay for text readability */
          color: white;
          padding: 2rem;
          border-radius: 12px;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        .login-btn {
          background: #00bcd4;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          color: white;
          text-decoration: none;
          font-weight: bold;
          transition: background 0.3s ease;
        }

        .login-btn:hover {
          background: #0097a7;
        }

        @media (max-width: 600px) {
          h1 {
            font-size: 2rem;
          }

          p {
            font-size: 1rem;
          }
        }
      `}</style>
    </main>
  );
}
