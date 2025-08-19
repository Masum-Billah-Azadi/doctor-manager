"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PatientSignup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [err, setErr] = useState("");

  useEffect(()=> {
    // already logged in?
    fetch("/api/patient-auth/me").then(r=>r.json()).then(d=>{
      if (d.user) router.push("/patient/appointments");
    });
  }, [router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!/^\d{10,15}$/.test(form.phone)) {
      setErr("Invalid phone format");
      return;
    }

    const res = await fetch("/api/patient-auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/patient/appointments");
    } else {
      setErr(data.error || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "1rem" }}>
      <h2>Patient Signup</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <input placeholder="Full Name" value={form.name} onChange={e=>setForm(s=>({...s, name:e.target.value}))} required />
        <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm(s=>({...s, email:e.target.value}))} required />
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm(s=>({...s, phone:e.target.value}))} required />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm(s=>({...s, password:e.target.value}))} required />
        {err && <div style={{ color: "red" }}>{err}</div>}
        <button>Create Account</button>
      </form>
      <p style={{ marginTop: 12 }}>
        Already have account? <a href="/patient/login" style={{ textDecoration: "underline" }}>Login</a>
      </p>
    </div>
  );
}
