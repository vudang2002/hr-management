import React, { useEffect, useState } from "react";
import SideNavbar from "@/components/SideNavbar";
import AddEmployeeModal from "@/components/AddEmployeeModal";

const PersonnelDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setUpdatedEmployee(employee);
    setEditModalIsOpen(true);
  };

  const handleUpdateEmployee = async (e) => {
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
        setEmployees(
          employees.map((emp) => (emp._id === data._id ? data : emp))
        );
        setEditModalIsOpen(false);
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

  const handleDeleteEmployee = async (employeeId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${employeeId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setEmployees(employees.filter((emp) => emp._id !== employeeId));
        alert("Xóa nhân viên thành công!");
      } else {
        const errorText = await response.text();
        console.error("Delete Response Error:", errorText);
        alert("Có lỗi xảy ra khi xóa nhân viên!!!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra!!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  return (
    <div className="flex bg-[#f0f4f8]">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-[#f0f4f8]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#2899a9]">Quản Lý Nhân Sự</h1>
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

        {/* Employee Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-black">Tên</th>
                <th className="py-2 px-4 border-b text-black">Email</th>
                <th className="py-2 px-4 border-b text-black">Phone</th>
                <th className="py-2 px-4 border-b text-black">Department</th>
                <th className="py-2 px-4 border-b text-black">Position</th>
                <th className="py-2 px-4 border-b text-black">Salary</th>
                <th className="py-2 px-4 border-b text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee._id}>
                    <td className="py-2 px-4 border-b text-black">
                      {employee.name}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      {employee.email}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      {employee.phone}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      {employee.department}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      {employee.position}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      ${employee.salary}
                    </td>
                    <td className="py-2 px-4 border-b text-black">
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-lg"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-2 px-4 border-b text-center">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding new employee */}
      <AddEmployeeModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onAddEmployee={handleAddEmployee}
      />

      {/* Modal for editing employee */}
      {editModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Sửa Nhân Viên</h2>
            <form onSubmit={handleUpdateEmployee}>
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

export default PersonnelDashboard;
