import React, { useState } from "react";

const AddLeaveApplicationModal = ({
  isOpen,
  onClose,
  onAddLeaveApplication,
}) => {
  const [newLeaveApplication, setNewLeaveApplication] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
    reason: "",
    leaveType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLeaveApplication({ ...newLeaveApplication, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/leave-applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLeaveApplication),
        }
      );

      if (response.ok) {
        const data = await response.json();
        onAddLeaveApplication(data);
        onClose();
      } else {
        const errorText = await response.text();
        console.error("Add Response Error:", errorText);
        alert("Có lỗi xảy ra khi thêm đơn xin nghỉ!!!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra!!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Thêm Đơn Xin Nghỉ</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="employeeId"
            placeholder="Mã Nhân Viên"
            value={newLeaveApplication.employeeId}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <input
            type="date"
            name="startDate"
            placeholder="Ngày Bắt Đầu"
            value={newLeaveApplication.startDate}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <input
            type="date"
            name="endDate"
            placeholder="Ngày Kết Thúc"
            value={newLeaveApplication.endDate}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <input
            type="text"
            name="reason"
            placeholder="Lý Do"
            value={newLeaveApplication.reason}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <input
            type="text"
            name="leaveType"
            placeholder="Loại Nghỉ"
            value={newLeaveApplication.leaveType}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#2899a9] text-white px-4 py-2 rounded-lg mr-2"
            >
              Thêm
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeaveApplicationModal;
