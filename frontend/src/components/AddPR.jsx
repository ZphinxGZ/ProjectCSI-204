import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddPR.css";

const AddPR = () => {
  const [items, setItems] = useState([{ name: "", details: "", quantity: 0, price: 0, total: 0 }]);
  const [note, setNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true); // Initialize modal as open by default

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

  const handleSave = (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    console.log("Saving PR:", { items, note });
    // Add save logic here
    setIsModalOpen(false); // Close modal after saving
  };

  return (
    <div>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มใบขอซื้อ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSave}> {/* ใช้ form เพื่อจัดการการ submit */}
            <div className="add-pr">
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
                    <button className="btn btn-danger" onClick={() => handleRemoveItem(index)}>
                      ลบ
                    </button>
                  </div>
                ))}
                <button className="btn btn-success" onClick={handleAddItem}>
                  เพิ่มรายการ
                </button>
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
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
            ยกเลิก
          </button>
          <button className="btn btn-primary" type="submit" onClick={handleSave}>
            บันทึก
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddPR;
