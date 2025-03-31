import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const CreatePaymentForm = ({ onCreate, onCancel }) => {
  const [formData, setFormData] = useState({
    reference_number: "",
    payment_date: "",
    payment_method: "Transfer",
    amount: "",
    notes: "",
    processed_by: "",
    status: "ชำระแล้ว",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.reference_number ||
      !formData.payment_date ||
      !formData.amount ||
      !formData.processed_by
    ) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
      return;
    }

    onCreate({ ...formData, amount: parseFloat(formData.amount) });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="reference_number">
            <Form.Label>ใบชำระ *</Form.Label>
            <Form.Control
              type="text"
              name="reference_number"
              placeholder="PAY-2025-XXX"
              value={formData.reference_number}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="payment_date">
            <Form.Label>วันที่ชำระ *</Form.Label>
            <Form.Control
              type="date"
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="payment_method">
            <Form.Label>วิธีการชำระ</Form.Label>
            <Form.Select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
            >
              <option value="Transfer">โอนเงิน</option>
              <option value="Cash">เงินสด</option>
              <option value="Cheque">เช็ค</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="amount">
            <Form.Label>จำนวนเงิน *</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="processed_by">
            <Form.Label>ผู้ดำเนินการ *</Form.Label>
            <Form.Control
              type="text"
              name="processed_by"
              value={formData.processed_by}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="status">
            <Form.Label>สถานะ</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="ชำระแล้ว">ชำระแล้ว</option>
              <option value="ค้างชำระ">ค้างชำระ</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="notes" className="mb-3">
        <Form.Label>หมายเหตุ</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="รายละเอียดเพิ่มเติม เช่น ใบแจ้งหนี้ / โครงการที่เกี่ยวข้อง"
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          ยกเลิก
        </button>
        <button type="submit" className="btn btn-primary">
          บันทึก
        </button>
      </div>
    </Form>
  );
};

export default CreatePaymentForm;