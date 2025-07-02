"use client";
import { signOut, useSession } from "next-auth/react";

export default function DoctorProfile() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div style={{ padding: "1rem", borderRight: "1px solid #ccc" }}>
      <img
        src={session.user.image}
        alt="Doctor"
        style={{ width: "80px", borderRadius: "50%" }}
      />
      <h2>{session.user.name}</h2>
      <p>{session.user.phone || session.user.email}</p>
      <button onClick={() => signOut()}>Logout</button>
      <br />
      <a href="/dashboard/edit-doctor">
        <button>Edit Profile</button>
      </a>
    </div>
  );
}
