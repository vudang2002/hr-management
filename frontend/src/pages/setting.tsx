import SideNavbar from "@/components/SideNavbar";
import React from "react";

const SettingDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-[#f0f4f8]">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-[#2899a9]">
            Xin chào, Cài Đặt!
          </h1>
          <input
            type="text"
            placeholder="Search..."
            className="border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Main Content is empty */}
        <div className="mt-6">
          {/* Add any content here if needed */}
        </div>
      </div>
    </div>
  );
};

export default SettingDashboard;