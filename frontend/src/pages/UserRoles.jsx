import React from "react";
import "../styles/userRoles.css";

const UserRoles = () => {
  const roles = [
    { id: 1, name: "Admin", permissions: { manage_users: true, view_reports: true, approve_requests: true } },
    { id: 2, name: "Procurement", permissions: { create_pr: true, view_pr: true, manage_inventory: true } },
    { id: 3, name: "Finance", permissions: { process_payments: true, view_reports: true } },
    { id: 4, name: "Management", permissions: { view_reports: true, approve_requests: true } },
  ];

  return (
    <div className="user-roles">
      <h2>Manage Roles and Permissions</h2>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>จัดการบัญชีผู้ใช้</th>
            <th>ดูรายงาน</th>
            <th>อนุมัติคำร้อง</th>
            <th>สร้างคำขอซื้อ</th>
            <th>ดูคำขอซื้อ</th>
            <th>จัดการสินค้า</th>
            <th>ดำเนินการชำระเงิน</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                <input type="checkbox" checked={role.permissions.manage_users || false} readOnly />
              </td>
              <td>
                <input type="checkbox" checked={role.permissions.view_reports || false} readOnly />
              </td>
              <td>
                <input type="checkbox" checked={role.permissions.approve_requests || false} readOnly />
              </td>
              <td>
                <input type="checkbox" checked={role.permissions.create_pr || false} readOnly />
              </td>
              <td>
                <input type="checkbox" checked={role.permissions.view_pr || false} readOnly />
              </td>
              <td>
                <input type="checkbox" checked={role.permissions.manage_inventory || false} readOnly />
              </td>
              <td>
                <input type="checkbox" checked={role.permissions.process_payments || false} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRoles;
