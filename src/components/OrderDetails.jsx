import React, { useState } from "react";
import "./OrderDetails.css";

function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState({
    poNumber: "",
    supplier: "",
    items: [{ name: "", quantity: 1 }],
    prNumber: "",
    peNumber: "",
    pendingPayment: 0.0,
    paid: 0.0,
    total: 0.0,
    dueDate: "",
    status: "เสร็จสมบูรณ์",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...orderDetails.items];
    updatedItems[index][field] = value;
    setOrderDetails({ ...orderDetails, items: updatedItems });
  };

  const addItem = () => {
    setOrderDetails({
      ...orderDetails,
      items: [...orderDetails.items, { name: "", quantity: 1 }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = orderDetails.items.filter((_, i) => i !== index);
    setOrderDetails({ ...orderDetails, items: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Details Submitted:", orderDetails);
  };

  return (
    <div className="order-details">
      <h1 className="order-details-title">Order Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="order-details-section">
          <label>
            ใบสั่งซื้อ:
            <input
              type="text"
              name="poNumber"
              value={orderDetails.poNumber}
              onChange={handleInputChange}
            />
          </label>
          <label>
            ผู้ขาย:
            <input
              type="text"
              name="supplier"
              value={orderDetails.supplier}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="order-details-section">
          <h2>รายการสินค้า</h2>
          {orderDetails.items.map((item, index) => (
            <div key={index} className="order-item">
              <input
                type="text"
                placeholder="Item name"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
              />
              <button type="button" onClick={() => removeItem(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addItem}>
            Add Item
          </button>
        </div>

        <div className="order-details-section">
          <label>
            ใบขอซื้อ:
            <input
              type="text"
              name="prNumber"
              value={orderDetails.prNumber}
              onChange={handleInputChange}
            />
          </label>
          <label>
            ใบชำระเงิน:
            <input
              type="text"
              name="peNumber"
              value={orderDetails.peNumber}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="order-details-section">
          <label>
            ค้างชำระ:
            <input
              type="number"
              name="pendingPayment"
              value={orderDetails.pendingPayment}
              onChange={handleInputChange}
            />
          </label>
          <label>
            ชำระแล้ว:
            <input
              type="number"
              name="paid"
              value={orderDetails.paid}
              onChange={handleInputChange}
            />
          </label>
          <label>
            รวมเป็นเงินทั้งหมด:
            <input
              type="number"
              name="total"
              value={orderDetails.total}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="order-details-section">
          <label>
            ครบกำหนด:
            <input
              type="date"
              name="dueDate"
              value={orderDetails.dueDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            สถานะ:
            <select
              name="status"
              value={orderDetails.status}
              onChange={handleInputChange}
            >
              <option value="เสร็จสมบูรณ์">เสร็จสมบูรณ์</option>
              <option value="ไม่อนุมัติ 'สั่งซื้อ'">ไม่อนุมัติ 'สั่งซื้อ'</option>
            </select>
          </label>
        </div>

        <button type="submit">Save Order</button>
      </form>
    </div>
  );
}

export default OrderDetails;