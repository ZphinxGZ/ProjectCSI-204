import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./InventoryDetailsModal.css"; // Import the CSS file for styling

const InventoryDetailsModal = ({ show, onHide, inventoryItem, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    if (inventoryItem) {
      setEditedItem({ ...inventoryItem }); // Ensure the _id is included in the editedItem state
    }
  }, [inventoryItem]);

  const handleSave = () => {
    if (editedItem._id) {
      onSave(editedItem); // Pass the _id to the onSave function
      setEditMode(false);
    } else {
      console.error("Error: Missing item ID.");
    }
  };

  if (!inventoryItem) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? "แก้ไขข้อมูลสินค้า" : "รายละเอียดสินค้า"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        {editMode ? (
          <div className="modal-form">
            <label>ชื่อสินค้า:</label>
            <input
              type="text"
              value={editedItem.name || ""}
              onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
            />
            <label>หมวดหมู่:</label>
            <input
              type="text"
              value={editedItem.category || ""}
              onChange={(e) => setEditedItem({ ...editedItem, category: e.target.value })}
            />
            <label>หน่วย:</label>
            <input
              type="text"
              value={editedItem.unit || ""}
              onChange={(e) => setEditedItem({ ...editedItem, unit: e.target.value })}
            />
            <label>จำนวนขั้นต่ำ:</label>
            <input
              type="number"
              value={editedItem.min_order || 0}
              onChange={(e) => setEditedItem({ ...editedItem, min_order: parseInt(e.target.value, 10) })}
            />
            <label>ราคาต่อหน่วย:</label>
            <input
              type="number"
              value={editedItem.unit_cost || 0}
              onChange={(e) => setEditedItem({ ...editedItem, unit_cost: parseFloat(e.target.value) })}
            />
            <label>จำนวนคงเหลือ:</label>
            <input
              type="number"
              value={editedItem.current_quantity || 0}
              onChange={(e) => setEditedItem({ ...editedItem, current_quantity: parseInt(e.target.value, 10) })}
            />
          </div>
        ) : (
          <div className="modal-details">
            <p><strong>รหัสสินค้า:</strong> {inventoryItem.item_code}</p>
            <p><strong>ชื่อสินค้า:</strong> {inventoryItem.name}</p>
            <p><strong>หมวดหมู่:</strong> {inventoryItem.category}</p>
            <p><strong>หน่วย:</strong> {inventoryItem.unit}</p>
            <p><strong>จำนวนขั้นต่ำ:</strong> {inventoryItem.min_order}</p>
            <p><strong>จำนวนคงเหลือ:</strong> {inventoryItem.current_quantity}</p>
            <p><strong>ราคาต่อหน่วย:</strong> {inventoryItem.unit_cost}</p>
            <p><strong>มูลค่ารวม:</strong> {inventoryItem.total_value}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {editMode ? (
          <>
            <Button variant="secondary" onClick={() => setEditMode(false)}>ยกเลิก</Button>
            <Button variant="primary" onClick={handleSave}>บันทึก</Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={onHide}>ปิด</Button>
            <Button variant="primary" onClick={() => setEditMode(true)}>แก้ไข</Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default InventoryDetailsModal;
