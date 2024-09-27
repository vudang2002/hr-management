import SideNavbar from "@/components/SideNavbar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-[#f0f4f8]">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-[#2899a9]">Hello, Admin!</h1>
          <input
            type="text"
            placeholder="Search..."
            className="border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2899a9]">
            <h2 className="text-2xl font-bold text-[#2899a9]">
              Total Applications
            </h2>
            <p className="text-3xl mt-2 text-[#2899a9]">5421</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2899a9]">
            <h2 className="text-2xl font-bold text-[#2899a9]">
              Rejected Applications
            </h2>
            <p className="text-3xl mt-2 text-[#2899a9]">2521</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
