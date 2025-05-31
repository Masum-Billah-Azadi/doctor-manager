'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    signIn('google');
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}
