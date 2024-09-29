import React, { useEffect, useState } from "react";
import SideNavbar from "@/components/SideNavbar";
import AddUserModal from "@/components/AddUserModal";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setUpdatedUser(user);
    setEditModalIsOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${updatedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUsers(users.map((usr) => (usr._id === data._id ? data : usr)));
        setEditModalIsOpen(false);
      } else {
        const errorText = await response.text();
        console.error("Update Response Error:", errorText);
        alert("Có lỗi xảy ra khi cập nhật người dùng!!!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra!!");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setUsers(users.filter((usr) => usr._id !== userId));
        alert("Xóa người dùng thành công!");
      } else {
        const errorText = await response.text();
        console.error("Delete Response Error:", errorText);
        alert("Có lỗi xảy ra khi xóa người dùng!!!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra!!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  return (
    <div className="flex bg-[#f0f4f8]">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-[#f0f4f8]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#2899a9]">
            Quản Lý Người Dùng
          </h1>
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

        {/* User Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-black">Tên Đăng Nhập</th>
                <th className="py-2 px-4 border-b text-black">Mật Khẩu</th>

                <th className="py-2 px-4 border-b text-black">Vai Trò</th>
                <th className="py-2 px-4 border-b text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="py-2 px-4 border-b text-black">
                      {user.username}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      {user.password}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      {user.role}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-lg"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-2 px-4 border-b text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding new user */}
      <AddUserModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onAddUser={handleAddUser}
      />

      {/* Modal for editing user */}
      {editModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Sửa Người Dùng</h2>
            <form onSubmit={handleUpdateUser}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={updatedUser?.username || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg mb-2 w-full"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={updatedUser?.password || ""}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg mb-2 w-full"
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={updatedUser?.role || ""}
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

export default UserManagement;
