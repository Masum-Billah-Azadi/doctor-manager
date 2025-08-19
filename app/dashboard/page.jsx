"use client";

import Link from "next/link";
import DoctorProfile from "../components/DoctorProfile";
import PatientList from "../components/PatientList";
import SearchAndAdd from "../components/SearchAddPanel";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Column: Doctor Info */}
      <div style={{ width: "20%" }}>
        <DoctorProfile />
      </div>

      {/* Middle Column: Patients */}
      <div style={{ width: "60%", overflowY: "auto" }}>
        <PatientList />
      </div>

      {/* Right Column: Appointments + Search */}
      <div style={{ width: "20%", padding: "1rem" }}>
        {/* Appointments Tab */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>Appointments</h3>
          <Link href="/dashboard/appointments">
            <button
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#00bcd4",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              View Appointments
            </button>
          </Link>
        </div>

        {/* Existing Search & Add Panel */}
        <SearchAndAdd />
      </div>
    </div>
  );
}
