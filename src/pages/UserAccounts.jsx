import React, { useState } from "react";
import "../styles/userAccounts.css"; 

const UserAccounts = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Finance" },
    { id: 2, name: "Jane Smith", role: "Procurement" },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [newAccount, setNewAccount] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    role: "Procurement",
  });

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const newId = users.length + 1;
    setUsers((prev) => [...prev, { id: newId, ...newAccount }]);
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

  return (
    <div className="user-accounts">
      <h2>Manage User Accounts</h2>
      <button
        className={`toggle-form-button ${isFormOpen ? "close" : "open"}`}
        onClick={toggleForm}
      >
        {isFormOpen ? "Close Create Account" : "Create New Account"}
      </button>

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
            <th className="actions-header">Actions</th>
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
                  className="action-button reset"
                  onClick={() => alert(`Reset password for User ID: ${user.id}`)}
                >
                  Reset Password
                </button>
                <button
                  className="action-button change-role"
                  onClick={() => alert(`Change role for User ID: ${user.id}`)}
                >
                  Change Role
                </button>
                <button
                  className="action-button delete"
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
    </div>
  );
};

export default UserAccounts;
