"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPatientPage() {
  const { id } = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", condition: "" });

  useEffect(() => {
    // Fetch current patient data
    fetch(`/api/patients/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPatient(data);
        setForm({ name: data.name, age: data.age, condition: data.condition });
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push(`/patient/${id}`);
  };

  if (!patient) return <div>Loading patient data...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Age:
          <input name="age" value={form.age} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Condition:
          <input name="condition" value={form.condition} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Update Patient</button>
      </form>
    </div>
  );
}
