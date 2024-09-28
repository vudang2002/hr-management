import React, { useState, useEffect } from "react";

const EditEmployeeModal = ({ isOpen, onClose, employee, onUpdateEmployee }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState(employee);

  useEffect(() => {
    if (employee) {
      setUpdatedEmployee(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${updatedEmployee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEmployee),
        }
      );

      if (response.ok) {
        const data = await response.json();
        onUpdateEmployee(data);
        onClose();
      } else {
        const errorText = await response.text();
        console.error("Update Response Error:", errorText);
        alert("Có lỗi xảy ra khi cập nhật nhân viên!!!");
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
        <h2 className="text-2xl font-bold mb-4">Sửa Nhân Viên</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={updatedEmployee?.name || ""}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={updatedEmployee?.email || ""}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={updatedEmployee?.phone || ""}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={updatedEmployee?.department || ""}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={updatedEmployee?.position || ""}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={updatedEmployee?.salary || ""}
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

export default EditEmployeeModal;