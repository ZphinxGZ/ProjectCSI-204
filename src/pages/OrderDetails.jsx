import React from "react";
import "./OrderDetails.css";

const OrderDetails = ({ order }) => {
  if (!order) {
    return <div className="order-details">No order selected.</div>;
  }

  return (
    <div className="order-details">
      <h1 className="order-details-title">Order Details</h1>
      <div className="order-details-section">
        <h2>General Information</h2>
        <p><strong>PO Number:</strong> {order.poNumber}</p>
        <p><strong>Supplier:</strong> {order.supplier}</p>
        <p><strong>Status:</strong> <span className={order.status.includes("ไม่อนุมัติ") ? "order-status-rejected" : "order-status-completed"}>{order.status}</span></p>
      </div>
      <div className="order-details-section">
        <h2>Items</h2>
        <ul>
          {order.items.map((item, index) => (
            <li key={index} className="order-item">{item}</li>
          ))}
        </ul>
      </div>
      <div className="order-details-section">
        <h2>Financial Details</h2>
        <p><strong>Pending Payment:</strong> {order.pendingPayment.toFixed(2)}</p>
        <p><strong>Paid:</strong> {order.paid.toFixed(2)}</p>
        <p><strong>Total:</strong> {order.total.toFixed(2)}</p>
        <p><strong>Due Date:</strong> {order.dueDate}</p>
      </div>
      <div className="order-details-section">
        <h2>References</h2>
        <p><strong>PR Number:</strong> {order.prNumber}</p>
        <p><strong>PE Number:</strong> {order.peNumber}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
