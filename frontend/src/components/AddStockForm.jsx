import React, { useState } from "react";
import "./AddStockForm.css";

const AddStockForm = ({ onAddStock, onCancel }) => {
  const [newItem, setNewItem] = useState({
    item: "",
    type: "",
    unit: "",
    price: 0,
    minStock: 0,
    storage: "",
    remaining: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: name === "price" || name === "minStock" || name === "remaining" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.item && newItem.type && newItem.unit && newItem.storage) {
      onAddStock(newItem);
      setNewItem({
        item: "",
        type: "",
        unit: "",
        price: 0,
        minStock: 0,
        storage: "",
        remaining: 0,
      });
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <div className="add-stock-form">
      <h2>เพิ่มสินค้าใหม่</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            ชื่อสินค้า:
            <input
              type="text"
              name="item"
              value={newItem.item}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            ประเภท:
            <input
              type="text"
              name="type"
              value={newItem.type}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            หน่วย:
            <input
              type="text"
              name="unit"
              value={newItem.unit}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            ราคา:
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            สต๊อกขั้นต่ำ:
            <input
              type="number"
              name="minStock"
              value={newItem.minStock}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            ที่จัดเก็บ:
            <input
              type="text"
              name="storage"
              value={newItem.storage}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            คงเหลือ:
            <input
              type="number"
              name="remaining"
              value={newItem.remaining}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-buttons">
          <button type="submit">บันทึก</button>
          <button type="button" onClick={onCancel}>
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStockForm;
