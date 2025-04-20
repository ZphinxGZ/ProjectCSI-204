import React from "react";
import { Modal, Button } from "react-bootstrap";

const InventoryDetailsModal = ({ show, onHide, inventoryItem }) => {
  if (!inventoryItem) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>รายละเอียดสินค้า</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>รหัสสินค้า:</strong> {inventoryItem.item_code}</p>
        <p><strong>ชื่อสินค้า:</strong> {inventoryItem.name}</p>
        <p><strong>หมวดหมู่:</strong> {inventoryItem.category}</p>
        <p><strong>หน่วย:</strong> {inventoryItem.unit}</p>
        <p><strong>จำนวนขั้นต่ำ:</strong> {inventoryItem.min_order}</p>
        <p><strong>จำนวนคงเหลือ:</strong> {inventoryItem.current_quantity}</p>
        <p><strong>ราคาต่อหน่วย:</strong> {inventoryItem.unit_cost}</p>
        <p><strong>มูลค่ารวม:</strong> {inventoryItem.total_value}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>ปิด</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InventoryDetailsModal;
