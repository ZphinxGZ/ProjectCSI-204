import React from "react";
import "./PaymentDetailModal.css";

const PaymentDetailModal = ({ payment, onClose }) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("th-TH");

  if (!payment) return null;

  return (
    <div className="modal-overlay">
      <div className="payment-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h3 className="modal-title-detail">รายละเอียดใบชำระ</h3>
        <p><strong>ใบชำระ:</strong> {payment.reference_number}</p>
        <p><strong>วันที่ชำระเงิน:</strong> {formatDate(payment.payment_date)}</p>
        <p><strong>วิธีการชำระ:</strong> {payment.payment_method}</p>
        <p><strong>จำนวนเงิน:</strong> {payment.amount.toFixed(2)}</p>
        <p><strong>การผ่อนชำระ:</strong>
          {payment.payment_method === "Installment"
            ? `${payment.installmentAmount?.toLocaleString()} / ${payment.installments} งวด (งวดที่ ${payment.currentInstallment})`
            : "-"}
        </p>
        <p><strong>ผู้ดำเนินการ:</strong> {payment.processed_by}</p>
        <p><strong>หมายเหตุ:</strong> {payment.notes}</p>
        <p><strong>สถานะ:</strong> {payment.status}</p>
      </div>
    </div>
  );
};

export default PaymentDetailModal;