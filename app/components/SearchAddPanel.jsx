// components/SearchAddPanel.jsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchAndAdd() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === "") {
        setResults([]);
        setNotFound(false);
        return;
      }

      try {
        const res = await fetch(`/api/patients/search?q=${query}`);
        const data = await res.json();

        if (res.ok && data.patients.length > 0) {
          setResults(data.patients);
          setNotFound(false);
        } else {
          setResults([]);
          setNotFound(true);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
        setNotFound(true);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 400); // debounce input

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div style={{ padding: "1rem", borderLeft: "1px solid #ccc" }}>
      <input
        type="text"
        placeholder="Search by patient name or number..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "0.5rem" }}
      />

      {results.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
          {results.map((patient) => (
            <li
              key={patient._id}
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
              onClick={() => router.push(`/patient/${patient._id}`)}
            >
              <strong>{patient.name}</strong> (- {patient.patientNumber})
            </li>
          ))}
        </ul>
      )}

      {notFound && (
        <p style={{ marginTop: "1rem", color: "red" }}>
          ❌ No patient found with this name or number.
        </p>
      )}
      <button
        style={{ marginTop: "1rem", width: "100%" }}
        onClick={() => router.push("/dashboard/add")}
      >
        ➕ Add New Patient
      </button>
    </div>
  );
}
