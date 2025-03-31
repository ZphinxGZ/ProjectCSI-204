import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 

import "./ProcurementOrders.css"; 
// นำเข้าไฟล์ CSS สำหรับจัดการสไตล์ของหน้า ProcurementOrders


const ProcurementPR = () => { 
  // สร้างฟังก์ชัน component ชื่อ ProcurementOrders

  const navigate = useNavigate(); 
  // ใช้ useNavigate hook สำหรับการนำทาง

  const receiptDetailsList = [ 
    // กำหนดข้อมูลตัวอย่าง (mock data) สำหรับรายการใบสั่งซื้อ
    { id: 1, prNumber: "PR-20250002", supplier: "ตาล", items: ["ssss x1", "ssss x111"], poNumber: "PO-20250003", dueDate: "31/03/2025", status: "เสร็จสมบูรณ์" },
    { id: 2, prNumber: "PR-20250001", supplier: "อู๋", items: ["test x1", "test x2"], poNumber: "PO-20250002", dueDate: "31/03/2025", status: "ไม่อนุมัติ 'สั่งซื้อ'" },
    { id: 3, prNumber: "-", supplier: "เจ้น", items: ["pen x100", "pencil x50"], poNumber: "PO-20250001", dueDate: "31/03/2025", status: "เสร็จสมบูรณ์" },
    // ...ข้อมูลตัวอย่างอื่นๆ...
  ];

  const headers = [ 
    // กำหนดหัวตาราง (headers) สำหรับการแสดงผลในตาราง
    { key: "prNumber", label: "ใบสั่งซื้อ (PR)" },
    { key: "supplier", label: "ผู้ทำรายการ" },
    { key: "items", label: "รายการสินค้า" },
    { key: "poNumber", label: "ใบสั่งซื้อ (PO)" },
    { key: "dueDate", label: "ครบกำหนด" },
    { key: "status", label: "สถานะ" },
    // ...หัวข้ออื่นๆ...
  ];

  const handlePoNumberClick = (prNumber) => {
    console.log(`Navigating to PR Details with prNumber: ${prNumber}`); // Debug log
    navigate(`/pr-details/${prNumber}`); 
    // Navigate to the PR Details page with the prNumber as a parameter
  };

  const handleAddOrderClick = () => {
    navigate("/add-pr");
  };

  const renderCell = (key, value) => { 
    // ฟังก์ชันสำหรับเรนเดอร์ค่าของแต่ละเซลล์ในตาราง
    if (key === "items") { 
      // ถ้าคีย์เป็น "items" ให้แสดงรายการสินค้าในรูปแบบ tag
      return value.map((item, index) => (
        <div key={index} className="procurement-orders-item-tag">{item}</div>
      ));
    }
    if (key === "prNumber") { 
      return (
        <button
          className="procurement-orders-pr-button"
          onClick={() => handlePoNumberClick(value)}
        >
          {value}
        </button>
      );
    }
    if (key === "status") { 
      // ถ้าคีย์เป็น "status" ให้แสดงสถานะพร้อมสไตล์ที่เหมาะสม
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
    if (key === "poNumber") {
      return value; // Display PO number as plain text
    }
    if (typeof value === "number") { 
      // ถ้าค่าเป็นตัวเลข ให้แสดงผลในรูปแบบทศนิยม 2 ตำแหน่ง
      return value.toFixed(2);
    }
    return value; 
    // คืนค่าปกติสำหรับกรณีอื่นๆ
  };

  return ( 
    // ส่วนที่เรนเดอร์ UI ของ component
    <div className="procurement-orders">
      <h1 className="procurement-orders-title">Procurement PR</h1> 
      {/* แสดงหัวข้อของหน้า */}
      <button 
        className="procurement-orders-add-button" 
        onClick={handleAddOrderClick}
      >
        เพิ่มใบขอซื้อ
      </button>
      {/* Add button for adding a new order */}
      <table className="procurement-orders-table"> 
        {/* สร้างตาราง */}
        <thead>
          <tr className="procurement-orders-header-row">
            {headers.map((header) => (
              <th key={header.key} className="procurement-orders-header">{header.label}</th>
            ))}
            {/* เรนเดอร์หัวตาราง */}
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
              {/* เรนเดอร์ข้อมูลในแต่ละแถว */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcurementPR; 
// ส่งออก component ProcurementOrders
