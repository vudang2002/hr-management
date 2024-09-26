import Sidebar from "@/components/Sidebar";
const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Hello, Admin!</h1>
          <input
            type="text"
            placeholder="Search..."
            className="border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Total Applications</h2>
            <p className="text-3xl mt-2">5421</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Rejected Applications</h2>
            <p className="text-3xl mt-2">2521</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Shortlisted Applications</h2>
            <p className="text-3xl mt-2">1250</p>
          </div>
        </div>

        {/* Hiring Pipeline */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Hiring Pipeline</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="font-bold">LinkedIn</p>
              <div className="bg-yellow-400 h-2 w-full mt-2"></div>
            </div>
            <div>
              <p className="font-bold">Naukri.com</p>
              <div className="bg-red-400 h-2 w-full mt-2"></div>
            </div>
            <div>
              <p className="font-bold">Monster</p>
              <div className="bg-green-400 h-2 w-full mt-2"></div>
            </div>
          </div>
        </div>

        {/* Meetings */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Meetings</h2>
          <ul>
            <li>March 4: Interview - 9:00 AM to 12:00 PM</li>
            <li>March 16: GD/HR - 11:00 AM to 12:00 PM</li>
            <li>March 28: HR - 12:00 PM to 2:00 PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
