"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchAndAdd() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    // Future: Add filtering by patient name
    alert("Search coming soon!");
  };

  return (
    <div style={{ padding: "1rem", borderLeft: "1px solid #ccc" }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search patient..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </form>
      <button
        style={{ marginTop: "1rem", width: "100%" }}
        onClick={() => router.push("/dashboard/add")}
      >
        ➕ Add New Patient
      </button>
    </div>
  );
}
