import React from "react";
import "./PaymentDetailModal.css";

const PaymentDetailModal = ({ payment, onClose }) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("th-TH");

  const handlePrint = () => {
    window.print();
  };

  if (!payment) return null;

  return (
    <div className="modal-overlay" >
      <div className="receipt-paper" id="receipt-content">
        <button className="close-button no-print" onClick={onClose}>✖</button>

        <div className="receipt-box">
          <h2 className="company-name">บริษัท ……… จำกัด</h2>
          <h3 className="receipt-title">ใบเสร็จรับเงิน (Receipt)</h3>

          <div className="receipt-info">
            <div><strong>เลขที่ใบเสร็จ:</strong> {payment.reference_number}</div>
            <div><strong>วันที่:</strong> {formatDate(payment.payment_date)}</div>
          </div>

          <hr />

          <div className="receipt-section">
            <div><strong>ได้รับเงินจาก:</strong> {payment.processed_by}</div>
            <div><strong>วิธีการชำระ:</strong> {payment.payment_method}</div>
            <div>
              <strong>จำนวนเงิน:</strong>{" "}
              <span className="amount">
                {payment.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} บาท
              </span>
            </div>
            <div><strong>รายละเอียด:</strong> {payment.notes}</div>
          </div>

          <hr />

          <div className="receipt-sign">
            <div className="sign-line">................................................</div>
            <div className="sign-label">ผู้รับเงิน</div>
          </div>
        </div>

        <div className="receipt-buttons no-print">
          <button onClick={handlePrint}>🖨 พิมพ์ใบเสร็จ</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailModal;