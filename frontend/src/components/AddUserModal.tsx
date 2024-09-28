import React, { useState } from "react";

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "employee",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        onAddUser(data);
        onClose();
      } else {
        const errorText = await response.text();
        console.error("Add Response Error:", errorText);
        alert("Có lỗi xảy ra khi thêm người dùng!!!");
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
        <h2 className="text-2xl font-bold mb-4">Thêm Người Dùng</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg mb-2 w-full"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={newUser.role}
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

export default AddUserModal;