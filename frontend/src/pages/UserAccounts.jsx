import React, { useState } from "react";
import ResetPasswordModal from "./ResetPasswordModal"; // Modal สำหรับ Reset Password
import ChangeRoleModal from "./ChangeRoleModal"; // Modal สำหรับ Change Role
import "../styles/userAccounts.css";

const UserAccounts = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", username: "john.doe", email: "john.doe@example.com", role: "Finance" },
    { id: 2, name: "Jane Smith", username: "jane.smith", email: "jane.smith@example.com", role: "Procurement" },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false); // เปิด/ปิดฟอร์มสำหรับสร้างบัญชี
  const [showResetModal, setShowResetModal] = useState(false); // เปิด/ปิด Modal Reset Password
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false); // เปิด/ปิด Modal Change Role
  const [selectedUser, setSelectedUser] = useState(null); // เก็บข้อมูลผู้ใช้ที่เลือก (ID และชื่อ)

  const [newAccount, setNewAccount] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    role: "Procurement",
  });

  // ฟังก์ชันเปิด/ปิดฟอร์ม
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  // จัดการการเปลี่ยนค่าฟิลด์ในฟอร์ม
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  // สร้างบัญชีใหม่
  const handleCreateAccount = (e) => {
    e.preventDefault();
    const newId = users.length + 1;
    setUsers((prev) => [
      ...prev,
      { id: newId, name: newAccount.fullname, username: newAccount.username, email: newAccount.email, role: newAccount.role },
    ]);
    alert("Account created successfully!");
    setNewAccount({
      username: "",
      password: "",
      email: "",
      fullname: "",
      role: "Procurement",
    });
    setIsFormOpen(false);
  };

  // เปิด/ปิด Modal Reset Password
  const handleOpenResetModal = (user) => {
    setSelectedUser(user);
    setShowResetModal(true);
  };
  const handleCloseResetModal = () => {
    setSelectedUser(null);
    setShowResetModal(false);
  };

  // เปิด/ปิด Modal Change Role
  const handleOpenChangeRoleModal = (user) => {
    setSelectedUser(user);
    setShowChangeRoleModal(true);
  };
  const handleCloseChangeRoleModal = () => {
    setSelectedUser(null);
    setShowChangeRoleModal(false);
  };

  // บันทึกการเปลี่ยน Role
  const handleSaveRoleChanges = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    alert(`Role for User ID: ${userId} has been changed to ${newRole}`);
  };

  return (
    <div className="user-accounts">
      <h2>Manage User Accounts</h2>

      <button
        className={`toggle-form-button ${isFormOpen ? "close" : "open"}`}
        onClick={toggleForm}
      >
        {isFormOpen ? "Close Create Account" : "Create New Account"}
      </button>

      {/* ฟอร์มสร้างบัญชีใหม่ */}
      {isFormOpen && (
        <form className="create-account-form" onSubmit={handleCreateAccount}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={newAccount.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={newAccount.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={newAccount.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={newAccount.fullname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              name="role"
              value={newAccount.role}
              onChange={handleInputChange}
              required
            >
              <option value="Procurement">Procurement</option>
              <option value="Finance">Finance</option>
              <option value="Management">Management</option>
              <option value="IT Admin">IT Admin</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td className="button-group">
                <button
                  className="btn btn-warning"
                  onClick={() => handleOpenResetModal(user)}
                >
                  Reset Password
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleOpenChangeRoleModal(user)}
                >
                  Change Role
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    setUsers(users.filter((u) => u.id !== user.id))
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Reset Password */}
      {selectedUser && showResetModal && (
        <ResetPasswordModal
          show={showResetModal}
          userId={selectedUser.id}
          username={selectedUser.name}
          email={selectedUser.email}
          handleClose={handleCloseResetModal}
        />
      )}

      {/* Modal Change Role */}
      {selectedUser && showChangeRoleModal && (
        <ChangeRoleModal
          show={showChangeRoleModal}
          userId={selectedUser.id}
          username={selectedUser.name}
          email={selectedUser.email}
          currentRole={selectedUser.role}
          handleClose={handleCloseChangeRoleModal}
          handleSave={handleSaveRoleChanges}
        />
      )}
    </div>
  );
};

export default UserAccounts;
