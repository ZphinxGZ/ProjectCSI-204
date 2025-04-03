import React, { useState } from "react";
import "../styles/userRoles.css"; // Import CSS

const UserRoles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Procurement", permissions: { read: true, write: false, delete: false } },
    { id: 2, name: "Finance", permissions: { read: true, write: true, delete: false } },
    { id: 3, name: "Management", permissions: { read: true, write: true, delete: true } },
    { id: 4, name: "IT Admin", permissions: { read: true, write: true, delete: true } },
  ]);

  const handlePermissionChange = (roleId, permissionType) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: {
                ...role.permissions,
                [permissionType]: !role.permissions[permissionType],
              },
            }
          : role
      )
    );
  };

  const handleSaveChanges = () => {
    alert("แก้ไขเรียบร้อย"); // แสดงหน้าต่างแจ้งเตือน
  };

  return (
    <div className="user-roles">
      <h2>Manage Roles and Permissions</h2>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Read</th>
            <th>Write</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={role.permissions.read}
                  onChange={() => handlePermissionChange(role.id, "read")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={role.permissions.write}
                  onChange={() => handlePermissionChange(role.id, "write")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={role.permissions.delete}
                  onChange={() => handlePermissionChange(role.id, "delete")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button className="confirm-button" onClick={handleSaveChanges}>
          Confirm Changes
        </button>
      </div>
    </div>
  );
};

export default UserRoles;
