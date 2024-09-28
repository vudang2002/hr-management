import SideNavbar from "@/components/SideNavbar";
import React, { useEffect, useState } from "react";
const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setTotalUsers(data.length); // Assuming the API returns an array of users
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-[#f0f4f8]">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-[#2899a9]">
            Xin chào, Admin!
          </h1>
          <input
            type="text"
            placeholder="Search..."
            className="border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2899a9]">
            <h2 className="text-2xl font-bold text-[#2899a9]">
              Tổng Số Tài Khoản
            </h2>
            <p className="text-3xl mt-2 text-[#2899a9]">
              {totalUsers !== null ? totalUsers : "Loading..."}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2899a9]">
            <h2 className="text-2xl font-bold text-[#2899a9]">
              Tổng Số Đơn Xin Nghỉ
            </h2>
            <p className="text-3xl mt-2 text-[#2899a9]">2521</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2899a9]">
            <h2 className="text-2xl font-bold text-[#2899a9]">
              Số Đơn Đã Duyệt
            </h2>
            <p className="text-3xl mt-2 text-[#2899a9]">2521</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2899a9]">
            <h2 className="text-2xl font-bold text-[#2899a9]">
              Tổng Lương
            </h2>
            <p className="text-3xl mt-2 text-[#2899a9]">2521</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2899a9]">
            <h2 className="text-2xl font-bold text-[#2899a9]">
              Đơn Đang Chờ Duyệt
            </h2>
            <p className="text-3xl mt-2 text-[#2899a9]">2521</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2899a9]">
            <h2 className="text-2xl font-bold text-[#2899a9]">
              Đơn Đang Chờ Duyệt
            </h2>
            <p className="text-3xl mt-2 text-[#2899a9]">2521</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2899a9]">
            <h2 className="text-2xl font-bold text-[#2899a9]">
              Đơn Đang Chờ Duyệt
            </h2>
            <p className="text-3xl mt-2 text-[#2899a9]">2521</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2899a9]">
            <h2 className="text-2xl font-bold text-[#2899a9]">
              Đơn Đang Chờ Duyệt
            </h2>
            <p className="text-3xl mt-2 text-[#2899a9]">2521</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
