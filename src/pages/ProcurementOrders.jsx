import React, { useState } from "react";
import "./ProcurementOrders.css";
import OrderDetails from "./OrderDetails";

const ProcurementOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const receiptDetailsList = [
    { id: 1, poNumber: "PO-20250003", supplier: "ตาล", items: ["ssss x1", "ssss x111"], prNumber: "PR-20250002", peNumber: "PE-20250002", pendingPayment: 0.0, paid: 5555.0, total: 5555.0, dueDate: "31/03/2025", status: "เสร็จสมบูรณ์" },
    { id: 2, poNumber: "PO-20250002", supplier: "อู๋", items: ["test x1", "test x2"], prNumber: "PR-20250001", peNumber: "-", pendingPayment: 0.0, paid: 0.0, total: 154.0, dueDate: "31/03/2025", status: "ไม่อนุมัติ 'สั่งซื้อ'" },
    { id: 3, poNumber: "PO-20250001", supplier: "เจ้น", items: ["pen x100", "pencil x50"], prNumber: "-", peNumber: "PE-20250001", pendingPayment: 0.0, paid: 1250.0, total: 1250.0, dueDate: "31/03/2025", status: "เสร็จสมบูรณ์" },
  ];

  const headers = [
    { key: "poNumber", label: "ใบสั่งซื้อ" },
    { key: "supplier", label: "ผู้ขาย" },
    { key: "items", label: "รายการสินค้า" },
    { key: "prNumber", label: "ใบขอซื้อ" },
    { key: "peNumber", label: "ใบชำระเงิน" },
    { key: "pendingPayment", label: "ค้างชำระ" },
    { key: "paid", label: "ชำระแล้ว" },
    { key: "total", label: "รวมเป็นเงินทั้งหมด" },
    { key: "dueDate", label: "ครบกำหนด" },
    { key: "status", label: "สถานะ" },
  ];

  const renderCell = (key, value) => {
    if (key === "items") {
      return value.map((item, index) => (
        <div key={index} className="procurement-orders-item-tag">{item}</div>
      ));
    }
    if (key === "prNumber" || key === "peNumber") {
      return value.includes("PR") || value.includes("PE") ? (
        <span className="procurement-orders-green-dot">{value}</span>
      ) : (
        <span className="procurement-orders-red-dot">{value}</span>
      );
    }
    if (key === "status") {
      return (
        <span
          className={
            value.includes("ไม่อนุมัติ")
              ? "procurement-orders-status-rejected"
              : "procurement-orders-status-completed"
          }
        >
          {value}
        </span>
      );
    }
    if (typeof value === "number") {
      return value.toFixed(2);
    }
    return value;
  };

  return (
    <div className="procurement-orders">
      <h1 className="procurement-orders-title">Procurement Orders</h1>
      <table className="procurement-orders-table">
        <thead>
          <tr className="procurement-orders-header-row">
            {headers.map((header) => (
              <th key={header.key} className="procurement-orders-header">{header.label}</th>
            ))}
            <th className="procurement-orders-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {receiptDetailsList.map((receipt) => (
            <tr key={receipt.id} className="procurement-orders-row">
              {headers.map((header) => (
                <td key={header.key} className="procurement-orders-cell">
                  {renderCell(header.key, receipt[header.key])}
                </td>
              ))}
              <td className="procurement-orders-cell">
                <button onClick={() => setSelectedOrder(receipt)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && <OrderDetails order={selectedOrder} />}
    </div>
  );
};

export default ProcurementOrders;
