import React, { useState } from "react";
import "./OrderDetails.css";

const OrderDetails = ({ order, onSave }) => {
  const [editableOrder, setEditableOrder] = useState(order);

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

      {/* ข้อมูลผู้ขาย */}
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

      {/* วันที่ และ ประเภทการสั่งซื้อ */}
      <div className="order-section">
        <h2>วันที่</h2>
        <input type="date" name="dueDate" value={editableOrder.dueDate} onChange={handleChange} />

        <h2>ประเภทการสั่งซื้อ</h2>
        <select name="orderType" value={editableOrder.orderType || ""} onChange={handleChange}>
          <option value="วัตถุดิบ">วัตถุดิบ</option>
          <option value="สินค้า">สินค้า</option>
        </select>
      </div>

      {/* รายการสินค้า */}
      <div className="order-section">
        <h2>รายการ</h2>
        {editableOrder.items.map((item, index) => (
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

      {/* ปุ่มบันทึก */}
      <button onClick={() => onSave(editableOrder)}>บันทึก</button>
    </div>
  );
};

export default OrderDetails;
