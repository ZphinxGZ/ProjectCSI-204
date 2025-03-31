import React from "react";
import "./ProcurementPayments.css";

const ProcurementPayments = () => {
  const paymentData = [
    {
      id: "67e9f988b76cd88b54b104c2",
      ap_id: "67e9f8ff4d2b0484b7b5b1c4",
      payment_date: "2023-10-05T00:00:00.000+00:00",
      payment_method: "Transfer",
      amount: 2000,
      reference_number: "PAY-2023-001",
      notes: "Partial payment for invoice INV-2023-001",
      processed_by: "67e9f8484d2b0484b7b5b1af",
      created_at: "2025-03-31T02:10:16.372+00:00",
      __v: 0,
      status: "ชำระแล้ว",
    },
    {
      id: "67e9f999b76cd88b54b104c3",
      ap_id: "67e9f9004d2b0484b7b5b1c5",
      payment_date: "2023-11-10T00:00:00.000+00:00",
      payment_method: "Cash",
      amount: 1500,
      reference_number: "PAY-2023-002",
      notes: "Full payment for invoice INV-2023-002",
      processed_by: "67e9f8484d2b0484b7b5b1af",
      created_at: "2025-03-31T02:15:00.000+00:00",
      __v: 0,
      status: "ชำระแล้ว",
    },
    {
      id: "67e9f9aab76cd88b54b104c4",
      ap_id: "67e9f9014d2b0484b7b5b1c6",
      payment_date: "2024-01-15T00:00:00.000+00:00",
      payment_method: "Cheque",
      amount: 0,
      reference_number: "PAY-2024-001",
      notes: "Awaiting approval",
      processed_by: "67e9f8484d2b0484b7b5b1af",
      created_at: "2025-03-31T02:20:00.000+00:00",
      __v: 0,
      status: "ค้างชำระ",
    },
    {
      id: "67e9f9bbb76cd88b54b104c5",
      ap_id: "67e9f9024d2b0484b7b5b1c7",
      payment_date: "2024-02-05T00:00:00.000+00:00",
      payment_method: "Transfer",
      amount: 5000,
      reference_number: "PAY-2024-002",
      notes: "Final payment for project X",
      processed_by: "67e9f8484d2b0484b7b5b1af",
      created_at: "2025-03-31T02:30:00.000+00:00",
      __v: 0,
      status: "ชำระแล้ว",
    },
  ];

  // เปลี่ยนลำดับ headers ตามที่ต้องการ
  const headers = [
    { key: "reference_number", label: "ใบชำระ" },
    { key: "payment_date", label: "วันที่ชำระเงิน" },
    { key: "payment_method", label: "วิธีการชำระ" },
    { key: "amount", label: "จำนวนเงิน" },
    { key: "processed_by", label: "ผู้ดำเนินการ" },
    { key: "notes", label: "หมายเหตุ" },
    { key: "status", label: "สถานะ" },
  ];

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateStr).toLocaleDateString("th-TH", options);
  };

  const renderCell = (key, value) => {
    if (key === "payment_date") {
      return formatDate(value);
    }
    if (key === "amount") {
      return value.toFixed(2);
    }
    if (key === "status") {
      return (
        <span
          className={
            value === "ชำระแล้ว"
              ? "procurement-payments-status-paid"
              : "procurement-payments-status-pending"
          }
        >
          {value}
        </span>
      );
    }
    return value;
  };

  return (
    <div className="procurement-payments">
      <h1 className="procurement-payments-title">Procurement Payments</h1>
      <table className="procurement-payments-table">
        <thead>
          <tr className="procurement-payments-header-row">
            {headers.map((header) => (
              <th key={header.key} className="procurement-payments-header">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paymentData.map((payment) => (
            <tr key={payment.id} className="procurement-payments-row">
              {headers.map((header) => (
                <td key={header.key} className="procurement-payments-cell">
                  {renderCell(header.key, payment[header.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcurementPayments;