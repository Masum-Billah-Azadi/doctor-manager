"use client";

import { useState } from "react";

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔄 Call API to update doctor profile here
    console.log("Updated profile:", { name, phone });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
