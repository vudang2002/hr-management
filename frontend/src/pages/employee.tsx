import Sidebar from "../components/Sidebar";

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold">Hello, Employee!</h1>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Your Profile</h2>
          <p>Name: John Doe</p>
          <p>Position: Software Engineer</p>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Leave Requests</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Request Leave
          </button>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Payroll</h2>
          <p>Your Salary: $5000</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
