import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetails.css";

const SellerInfo = ({ editableOrder, handleChange }) => (
  <div className="order-section">
    <h2>ผู้ขาย</h2>
    <label>ชื่อร้านค้า / บริษัท / บุคคล</label>
    <input type="text" name="supplier" value={editableOrder.supplier} onChange={handleChange} />

    <label>ที่อยู่</label>
    <textarea name="address" value={editableOrder.address || ""} onChange={handleChange}></textarea>

    <label>เบอร์โทร</label>
    <input type="text" name="phone" value={editableOrder.phone || ""} onChange={handleChange} />

    <label>อีเมล</label>
    <input type="email" name="email" value={editableOrder.email || ""} onChange={handleChange} />
  </div>
);

const OrderDetailsSection = ({ editableOrder, handleChange }) => (
  <div className="order-section">
    <h2>วันที่</h2>
    <input type="date" name="dueDate" value={editableOrder.dueDate} onChange={handleChange} />

    <h2>ประเภทการสั่งซื้อ</h2>
    <select name="orderType" value={editableOrder.orderType || ""} onChange={handleChange}>
      <option value="วัตถุดิบ">วัตถุดิบ</option>
      <option value="สินค้า">สินค้า</option>
    </select>
  </div>
);

const OrderStatus = ({ editableOrder, handleChange }) => (
  <div className="order-section">
    <h2>สถานะคำสั่งซื้อ</h2>
    <select name="status" value={editableOrder.status || ""} onChange={handleChange}>
      <option value="รอดำเนินการ">รอดำเนินการ</option>
      <option value="เสร็จสิ้น">เสร็จสิ้น</option>
      <option value="ยกเลิก">ยกเลิก</option>
    </select>
  </div>
);

const OrderItems = ({ items, handleItemChange }) => (
  <div className="order-section">
    <h2>รายการ</h2>
    {items.map((item, index) => (
      <div key={index} className="order-item">
        <input
          type="text"
          value={item.name}
          onChange={(e) => handleItemChange(index, "name", e.target.value)}
        />
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
        />
        <input
          type="number"
          value={item.price}
          onChange={(e) => handleItemChange(index, "price", e.target.value)}
        />
      </div>
    ))}
  </div>
);

const OrderDetails = ({ order, onSave, onCancel }) => {
  const { poNumber } = useParams();
  console.log(`Rendering OrderDetails for poNumber: ${poNumber}`); // Debug log

  const [editableOrder, setEditableOrder] = useState({
    ...order,
    poNumber: poNumber || order.poNumber,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableOrder({ ...editableOrder, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...editableOrder.items];
    updatedItems[index][field] = value;
    setEditableOrder({ ...editableOrder, items: updatedItems });
  };

  return (
    <div className="order-details">
      <h1 className="order-details-title">เลขที่ใบสั่งซื้อ {editableOrder.poNumber}</h1>
      <SellerInfo editableOrder={editableOrder} handleChange={handleChange} />
      <OrderDetailsSection editableOrder={editableOrder} handleChange={handleChange} />
      <OrderStatus editableOrder={editableOrder} handleChange={handleChange} />
      <OrderItems items={editableOrder.items} handleItemChange={handleItemChange} />
      <div className="order-actions">
        <button onClick={() => onSave(editableOrder)}>บันทึก</button>
        <button className="cancel-button" onClick={onCancel}>ยกเลิก</button>
      </div>
    </div>
  );
};

export default OrderDetails;
