'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function EditProfilePage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can send this data to backend to update doctor info
    console.log('Updated Info:', formData);
    alert('Profile updated (mock)');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled />

        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
