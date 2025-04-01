import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Select from "react-select"; 

const CreatePaymentForm = ({ onCreate, onCancel }) => {
  const [formData, setFormData] = useState({
    reference_number: "",
    payment_date: "",
    payment_method: "Transfer",
    amount: "",
    installments: 3,
    currentInstallment: 1,
    notes: "",
    processed_by: "",
    status: "ชำระแล้ว",
  });

  const getAllowedInstallments = (amount) => {
    if (amount <= 10000) return [3];
    if (amount <= 200000) return [3, 5, 10, 12, 18, 24];
    return [3, 5, 10, 12, 24, 36, 48, 60, 72, 84];
  };

  const renderInstallmentOptions = () => {
    const amt = parseFloat(formData.amount) || 0;
    const options = getAllowedInstallments(amt);
    return options.map((num) => (
      <option key={num} value={num}>
        {num} เดือน
      </option>
    ));
  };

  const currentInstallmentOptions = Array.from(
    { length: Number(formData.installments) || 1 },
    (_, i) => ({ value: i + 1, label: `งวดที่ ${i + 1}` })
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.reference_number ||
      !formData.payment_date ||
      !formData.amount ||
      !formData.processed_by
    ) {
      alert("กรุณากรอกข้อมูลที่จะเป็นให้ครบ");
      return;
    }

    const amountValue = parseFloat(formData.amount);
    const installments = parseInt(formData.installments);
    const currentInstallment = parseInt(formData.currentInstallment);
    const allowed = getAllowedInstallments(amountValue);

    if (
      formData.payment_method === "Installment" &&
      !allowed.includes(installments)
    ) {
      alert(
        `จำนวนเงิน ${amountValue.toLocaleString()} บาท เลือกงวดผ่อนได้เฉพาะ: ${allowed.join(", ")} เดือน`
      );
      return;
    }

    const installmentAmount = parseFloat(
      (amountValue / installments).toFixed(2)
    );

    const dataToSubmit = {
      ...formData,
      amount: amountValue,
      installments,
      currentInstallment,
      installmentAmount,
    };

    onCreate(dataToSubmit);
  };

  const installmentAmount =
    formData.payment_method === "Installment" && formData.amount && formData.installments
      ? parseFloat(formData.amount) / parseInt(formData.installments)
      : 0;

  const remaining =
    formData.payment_method === "Installment"
      ? installmentAmount *
        (parseInt(formData.installments) - parseInt(formData.currentInstallment) + 1)
      : 0;

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
              <option value="Installment">ผ่อนชำระ</option>
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

      {formData.payment_method === "Installment" && (
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="installments">
              <Form.Label>จำนวนงวด (เดือน)</Form.Label>
              <Form.Select
                name="installments"
                value={formData.installments}
                onChange={handleChange}
              >
                {renderInstallmentOptions()}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="currentInstallment" className="mt-3">
              <Form.Label>งวดที่ชำระล่าสุด</Form.Label>
              <Select 
                options={currentInstallmentOptions}
                value={currentInstallmentOptions.find(
                  (opt) => opt.value === parseInt(formData.currentInstallment)
                )}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    currentInstallment: selected.value,
                  }))
                }
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menu: (provided) => ({
                    ...provided,
                    maxHeight: 300,
                    overflowY: "auto",
                  }),
                }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <div className="p-3 bg-light rounded border h-100">
              <p className="mb-1">
                💸 <strong>ยอดผ่อนงวดละ:</strong>{" "}
                {installmentAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                บาท
              </p>
              <p className="mb-0">
                🧾 <strong>ยอดค้างชำระ (จากงวดที่ {formData.currentInstallment}):</strong>{" "}
                {remaining.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                บาท
              </p>
            </div>
          </Col>
        </Row>
      )}

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
          placeholder="รายละเอียดเพิ่มเติม เช่น ใบแจ้งหนี้ / โครงการที่เกี่ยวข้อ"
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
