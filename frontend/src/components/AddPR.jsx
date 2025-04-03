import React, { useState } from "react";
import "./AddPR.css";

const AddPR = () => {
  const [items, setItems] = useState([{ name: "", details: "", quantity: 0, price: 0, total: 0 }]);
  const [note, setNote] = useState("");

  const handleAddItem = () => {
    setItems([...items, { name: "", details: "", quantity: 0, price: 0, total: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === "quantity" || field === "price" ? parseFloat(value) || 0 : value;
    updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const handleSave = () => {
    console.log("Saving PR:", { items, note });
    // Add save logic here
  };

  return (
    <div className="add-pr">
      <h1>เพิ่มใบขอซื้อ</h1>
      <div className="add-pr-section">
        <h2>รายการ</h2>
        {items.map((item, index) => (
          <div key={index} className="add-pr-item">
            <input
              type="text"
              placeholder="สินค้า/บริการ"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="รายละเอียด"
              value={item.details}
              onChange={(e) => handleItemChange(index, "details", e.target.value)}
            />
            <input
              type="number"
              placeholder="จำนวน"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
            />
            <input
              type="number"
              placeholder="ราคา"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
            />
            <input type="number" placeholder="ยอดรวม" value={item.total.toFixed(2)} readOnly />
            <button onClick={() => handleRemoveItem(index)}>ลบ</button>
          </div>
        ))}
        <button onClick={handleAddItem}>เพิ่มรายการ</button>
      </div>
      <div className="add-pr-section">
        <h2>หมายเหตุ</h2>
        <textarea
          placeholder="หมายเหตุ"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
      <div className="add-pr-summary">
        <h2>รวมเป็นเงินทั้งหมด</h2>
        <p>{calculateTotal()}</p>
      </div>
      <button className="add-pr-save-button" onClick={handleSave}>
        บันทึก
      </button>
    </div>
  );
};

export default AddPR;
