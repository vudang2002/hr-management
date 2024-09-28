import React, { useState } from "react";

const AddEmployeeModal = ({ isOpen, onClose }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Tạo tài khoản người dùng
      const userResponse = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newEmployee.username,
          password: newEmployee.password,
          role: "employee"
        }),
      });

      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        console.error("User Response Error:", errorText);
        alert("Có lỗi xảy ra khi tạo tài khoản người dùng!!!");
        return;
      }

      const userData = await userResponse.json();

      // Thêm nhân viên vào hệ thống
      const employeeResponse = await fetch(
        "http://localhost:5000/api/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newEmployee.name,
            email: newEmployee.email,
            phone: newEmployee.phone,
            department: newEmployee.department,
            position: newEmployee.position,
            salary: newEmployee.salary,
            userId: userData._id, // Sử dụng ID người dùng từ phản hồi của API tạo tài khoản
          }),
        }
      );

      if (employeeResponse.ok) {
        alert("Thêm nhân viên thành công!");
        onClose();
      } else {
        const errorText = await employeeResponse.text();
        console.error("Employee Response Error:", errorText);
        alert("Có lỗi xảy ra khi thêm nhân viên!!!");
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
        <h2 className="text-2xl font-bold mb-4 text-black">Thêm Nhân Viên</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tên"
            value={newEmployee.name}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full text-black"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full text-black"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={newEmployee.phone}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full text-black"
          />
          <input
            type="text"
            name="department"
            placeholder="Phòng ban"
            value={newEmployee.department}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full text-black"
          />
          <input
            type="text"
            name="position"
            placeholder="Vị trí"
            value={newEmployee.position}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full text-black"
          />
          <input
            type="text"
            name="salary"
            placeholder="Lương"
            value={newEmployee.salary}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full text-black"
          />
          <input
            type="text"
            name="username"
            placeholder="Tài khoản"
            value={newEmployee.username}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={newEmployee.password}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full text-black"
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

export default AddEmployeeModal;
