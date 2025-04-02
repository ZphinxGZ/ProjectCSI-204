// ✅ Budgets.jsx
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./Budgets.css";
const Budgets = ({ show, paymentData, totalBudget, setTotalBudget }) => {
  const [tempBudget, setTempBudget] = useState(totalBudget);
  const [showEditModal, setShowEditModal] = useState(false);

  const totalPaid = paymentData.reduce(
    (sum, p) => sum + (p.status === "ชำระแล้ว" ? p.amount : 0),
    0
  );
  const remainingBudget = totalBudget - totalPaid;

  const handleConfirm = () => {
    setTotalBudget(tempBudget);
    setShowEditModal(false);
  };       

  if (!show) return null;

  return (
    <>
      <div className="budget-summary">
        <p>
          งบประมาณทั้งหมด: <strong>{totalBudget.toLocaleString()} บาท</strong>
          &nbsp;&nbsp; ยอดที่ชำระแล้ว: <strong>{totalPaid.toLocaleString()} บาท</strong>
          &nbsp;&nbsp; ยอดคงเหลือ: <strong>{remainingBudget.toLocaleString()} บาท</strong>
          <button
            className="btn btn-sm btn-warning ms-3"
            onClick={() => {
              setTempBudget(totalBudget);
              setShowEditModal(true);
            }}
          >
            ✏️ แก้ไขงบประมาณ
          </button>
        </p>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขงบประมาณ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="budget-new">งบประมาณใหม่:</label>
          <input
            type="number"
            className="form-control"
            value={tempBudget}
            onChange={(e) => setTempBudget(parseFloat(e.target.value) || 0)}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
            ยกเลิก
          </button>
          <button className="btn btn-primary" onClick={handleConfirm}>
            ยืนยัน
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Budgets;