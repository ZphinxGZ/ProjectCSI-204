import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/changeRoleModal.css"; // นำเข้าไฟล์ CSS

const ChangeRoleModal = ({ show, userId, username, email, currentRole, handleClose, handleSave }) => {
  const [selectedRole, setSelectedRole] = useState(currentRole); // State สำหรับเก็บ Role ที่เลือก

  const roles = ["Procurement", "Finance", "Management", "IT Admin"]; // ตัวเลือก Role

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value); // เปลี่ยน Role ตามที่เลือก
  };

  const handleSaveChanges = () => {
    handleSave(userId, selectedRole); // ส่งข้อมูลกลับไปยังฟังก์ชันใน parent component
    handleClose(); // ปิด Modal หลังจากบันทึกข้อมูล
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {username} 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* กล่องข้อความสำหรับ Name */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={username}
            readOnly // ตั้งค่าไม่สามารถแก้ไขได้
            className="form-control"
          />
        </div>
        {/* กล่องข้อความสำหรับ Email */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            readOnly // ตั้งค่าไม่สามารถแก้ไขได้
            className="form-control"
          />
        </div>
        {/* กล่องข้อความสำหรับ Current Role */}
        <div className="form-group">
          <label>Current Role:</label>
          <input
            type="text"
            value={currentRole}
            readOnly // ตั้งค่าไม่สามารถแก้ไขได้
            className="form-control"
          />
        </div>
        {/* Dropdown สำหรับ Select New Role */}
        <div className="form-group">
          <label>Select New Role:</label>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="form-control"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {/* ข้อความช่วยอธิบายใต้ dropdown */}
          <small className="helper-text">Please select a role for the user</small>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeRoleModal;
