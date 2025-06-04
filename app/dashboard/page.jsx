"use client";

import DoctorProfile from "../components/DoctorProfile";
import PatientList from "../components/PatientList";
import SearchAndAdd from "../components/SearchAddPanel";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ width: "20%" }}>
        <DoctorProfile />
      </div>
      <div style={{ width: "60%", overflowY: "auto" }}>
        <PatientList />
      </div>
      <div style={{ width: "20%" }}>
        <SearchAndAdd />
      </div>
    </div>
  );
}
