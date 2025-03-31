import React from "react";
import { useParams } from "react-router-dom";
import "./PRDetails.css";

const PRDetails = () => {
  const { prNumber } = useParams();

  // Mock data for demonstration
  const prDetails = {
    date: "01/04/2025",
    dueDate: "01/04/2025",
    items: [
      { name: "ดินสอ", details: "ดินสอ", quantity: 1, price: 1.0, total: 1.0 },
      { name: "น้ำ", details: "น้ำ", quantity: 1, price: 20.0, total: 20.0 },
    ],
    total: 21.0,
    note: "หมายเหตุ",
  };

  return (
    <div className="pr-details">
      <h1>ใบขอซื้อ {prNumber}</h1>
      <div>
        <h2>วันที่</h2>
        <p>{prDetails.date}</p>
        <h2>ครบกำหนด</h2>
        <p>{prDetails.dueDate}</p>
      </div>
      <div>
        <h2>รายการ</h2>
        {prDetails.items.map((item, index) => (
          <div key={index}>
            <p>สินค้า/บริการ: {item.name}</p>
            <p>รายละเอียด: {item.details}</p>
            <p>จำนวน: {item.quantity}</p>
            <p>ราคา: {item.price.toFixed(2)}</p>
            <p>ยอดรวม: {item.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>รวมเป็นเงินทั้งหมด</h2>
        <p>{prDetails.total.toFixed(2)}</p>
      </div>
      <div>
        <h2>หมายเหตุ</h2>
        <p>{prDetails.note}</p>
      </div>
    </div>
  );
};

export default PRDetails;
