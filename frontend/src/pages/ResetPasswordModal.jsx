import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ResetPasswordModal = ({ show, userId, username, handleClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  

  const handleResetPassword = () => {
    // ตรวจสอบว่าฟิลด์ทั้งหมดต้องไม่ว่าง
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    
    // ตรวจสอบว่า newPassword และ confirmPassword ตรงกัน
    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }
  
    setError("");
    alert(`Password for User ID: ${userId} (${username}) has been successfully reset!`);
    handleClose(); // ปิด Modal หลังจากดำเนินการ
  };
  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Reset Password for User ID: {userId} (Username: {username})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="form-control"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleResetPassword}>
          Reset Password
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPasswordModal;
