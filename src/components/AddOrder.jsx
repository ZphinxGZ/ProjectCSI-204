import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddOrder.css";

const AddOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    poNumber: "",
    supplier: "",
    items: "",
    prNumber: "",
    peNumber: "",
    total: "",
    dueDate: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
    navigate("/procurement-orders");
  };

  return (
    <div className="add-order">
      <h1 className="add-order-title">Add New Order</h1>
      <form className="add-order-form" onSubmit={handleSubmit}>
        <label>
          PO Number:
          <input
            type="text"
            name="poNumber"
            value={formData.poNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Supplier:
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Items (comma-separated):
          <input
            type="text"
            name="items"
            value={formData.items}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          PR Number:
          <input
            type="text"
            name="prNumber"
            value={formData.prNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          PE Number:
          <input
            type="text"
            name="peNumber"
            value={formData.peNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Total Amount:
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            <option value="เสร็จสมบูรณ์">เสร็จสมบูรณ์</option>
            <option value="ไม่อนุมัติ 'สั่งซื้อ'">ไม่อนุมัติ 'สั่งซื้อ'</option>
          </select>
        </label>
        <button type="submit" className="add-order-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
