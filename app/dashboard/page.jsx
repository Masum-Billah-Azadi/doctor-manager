'use client'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();

  const dummyPatients = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Patient #${i + 1}`,
  }));

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Column */}
      <aside style={{
        width: '25%',
        padding: '20px',
        background: '#f0f0f0',
        borderRight: '1px solid #ccc'
      }}>
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="Profile"
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
          />
        )}
        <h2 style={{ marginTop: '10px' }}>{session?.user?.name}</h2>
        <p>Address, Contact Info</p>
        <div style={{ marginTop: '10px' }}>
          <Link href="/dashboard/edit">
            <button>Edit Profile</button>
          </Link>
          <button onClick={() => signOut()} style={{ marginLeft: '10px' }}>Logout</button>
        </div>
      </aside>

      {/* Middle Column */}
      <main style={{ width: '50%', padding: '20px' }}>
        <h3>Patient List</h3>
        <ul>
          {dummyPatients.map(patient => (
            <li key={patient.id}>
              <Link href={`/dashboard/patient/${patient.id}`}>
                {patient.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>

      {/* Right Column */}
      <aside style={{
        width: '25%',
        padding: '20px',
        background: '#f9f9f9',
        borderLeft: '1px solid #ccc'
      }}>
        <input type="text" placeholder="Search Patient" style={{ width: '100%', padding: '8px' }} />
        <Link href="/dashboard/add">
          <button style={{ width: '100%', marginTop: '10px' }}>Add New Patient</button>
        </Link>
      </aside>
    </div>
  );
}
