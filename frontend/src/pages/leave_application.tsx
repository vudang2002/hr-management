import React, { useEffect, useState } from "react";
import SideNavbar from "@/components/SideNavbar";
import AddLeaveApplicationModal from "@/components/AddLeaveApplicationModal";

const LeaveApplicationDashboard = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentLeaveApplication, setCurrentLeaveApplication] = useState(null);
  const [updatedLeaveApplication, setUpdatedLeaveApplication] = useState({});

  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/leave-applications"
        );
        const data = await response.json();
        setLeaveApplications(data);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
      }
    };

    fetchLeaveApplications();
  }, []);

  const handleAddLeaveApplication = (newLeaveApplication) => {
    setLeaveApplications([...leaveApplications, newLeaveApplication]);
  };

  const handleEditLeaveApplication = (leaveApplication) => {
    setCurrentLeaveApplication(leaveApplication);
    setUpdatedLeaveApplication(leaveApplication);
    setEditModalIsOpen(true);
  };

  const handleUpdateLeaveApplication = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/leave-applications/${updatedLeaveApplication._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLeaveApplication),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLeaveApplications(
          leaveApplications.map((app) => (app._id === data._id ? data : app))
        );
        setEditModalIsOpen(false);
      } else {
        const errorText = await response.text();
        console.error("Update Response Error:", errorText);
        alert("Có lỗi xảy ra khi cập nhật đơn xin nghỉ!!!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra!!");
    }
  };

  const handleDeleteLeaveApplication = async (leaveApplicationId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/leave-applications/${leaveApplicationId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setLeaveApplications(
          leaveApplications.filter((app) => app._id !== leaveApplicationId)
        );
        alert("Xóa đơn xin nghỉ thành công!");
      } else {
        const errorText = await response.text();
        console.error("Delete Response Error:", errorText);
        alert("Có lỗi xảy ra khi xóa đơn xin nghỉ!!!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra!!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLeaveApplication({ ...updatedLeaveApplication, [name]: value });
  };

  return (
    <div className="flex bg-[#f0f4f8]">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-[#f0f4f8]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#2899a9]">Đơn Xin Nghỉ</h1>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="border px-4 py-2 rounded-lg mr-4"
            />
            <button
              onClick={() => setModalIsOpen(true)}
              className="bg-[#2899a9] text-white px-4 py-2 rounded-lg"
            >
              Thêm
            </button>
          </div>
        </div>

        {/* Leave Application Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-black">Tên Nhân Viên</th>
                <th className="py-2 px-4 border-b text-black">Ngày Bắt Đầu</th>
                <th className="py-2 px-4 border-b text-black">Ngày Kết Thúc</th>
                <th className="py-2 px-4 border-b text-black">Lý Do</th>
                <th className="py-2 px-4 border-b text-black">Loại Nghỉ</th>
                <th className="py-2 px-4 border-b text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveApplications.length > 0 ? (
                leaveApplications.map((leaveApplication) => (
                  <tr key={leaveApplication._id}>
                    <td className="py-2 px-4 border-b text-black">
                      {leaveApplication.employeeId.username}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      {leaveApplication.startDate}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      {leaveApplication.endDate}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      {leaveApplication.reason}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      {leaveApplication.leaveType}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      <button
                        onClick={() =>
                          handleEditLeaveApplication(leaveApplication)
                        }
                        className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteLeaveApplication(leaveApplication._id)
                        }
                        className="bg-red-500 text-white px-2 py-1 rounded-lg"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-2 px-4 border-b text-center">
                    No leave applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding new leave application */}
      <AddLeaveApplicationModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onAddLeaveApplication={handleAddLeaveApplication}
      />

      {/* Modal for editing leave application */}
      {editModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Sửa Đơn Xin Nghỉ</h2>
            <form onSubmit={handleUpdateLeaveApplication}>
              <input
                type="text"
                name="employeeId"
                placeholder="Mã Nhân Viên"
                value={updatedLeaveApplication?.employeeId || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg mb-2 w-full"
              />
              <input
                type="date"
                name="startDate"
                placeholder="Ngày Bắt Đầu"
                value={updatedLeaveApplication?.startDate || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg mb-2 w-full"
              />
              <input
                type="date"
                name="endDate"
                placeholder="Ngày Kết Thúc"
                value={updatedLeaveApplication?.endDate || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg mb-2 w-full"
              />
              <input
                type="text"
                name="reason"
                placeholder="Lý Do"
                value={updatedLeaveApplication?.reason || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg mb-2 w-full"
              />
              <input
                type="text"
                name="leaveType"
                placeholder="Loại Nghỉ"
                value={updatedLeaveApplication?.leaveType || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg mb-2 w-full"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#2899a9] text-white px-4 py-2 rounded-lg mr-2"
                >
                  Cập nhật
                </button>
                <button
                  type="button"
                  onClick={() => setEditModalIsOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApplicationDashboard;
