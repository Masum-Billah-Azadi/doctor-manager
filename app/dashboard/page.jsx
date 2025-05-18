export default function DashboardPage() {
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
      <div className="mt-6 flex flex-col gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          ➕ Add New Patient
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          📋 View Patient List
        </button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded">
          👤 Doctor Profile
        </button>
      </div>
    </div>
  );
}
