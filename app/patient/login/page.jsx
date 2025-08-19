"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PatientLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ phoneOrEmail: "", password: "" });
  const [err, setErr] = useState("");

  useEffect(()=> {
    fetch("/api/patient-auth/me").then(r=>r.json()).then(d=>{
      if (d.user) router.push("/patient/appointments");
    });
  }, [router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const res = await fetch("/api/patient-auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/patient/appointments");
    } else {
      setErr(data.error || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "1rem" }}>
      <h2>Patient Login</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <input placeholder="Phone or Email" value={form.phoneOrEmail} onChange={e=>setForm(s=>({...s, phoneOrEmail:e.target.value}))} required />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm(s=>({...s, password:e.target.value}))} required />
        {err && <div style={{ color: "red" }}>{err}</div>}
        <button>Login</button>
      </form>
      <p style={{ marginTop: 12 }}>
        New user? <a href="/patient/signup" style={{ textDecoration: "underline" }}>Create account</a>
      </p>
    </div>
  );
}
