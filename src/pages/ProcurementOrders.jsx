import React, { useState } from "react";
import "./ProcurementOrders.css";

const ProcurementOrders = () => {
  const [approvalStatus, setApprovalStatus] = useState("Pending");
  const [receivedGoods, setReceivedGoods] = useState(false);

  const handleApprovalUpdate = () => {
    setApprovalStatus(approvalStatus === "Approved" ? "Pending" : "Approved");
  };

  const handleGoodsReceived = () => {
    setReceivedGoods(true);
  };

  return (
    <div className="procurement-orders">
      <h1>Procurement Orders Page</h1>
      
      {/* PO Details Section */}
      <section className="po-details">
        <h2>PO Details</h2>
        <p>PO Number: 12345</p>
        <p>Supplier: ABC Supplies</p>
        <p>Items: 10</p>
        <p>Total Amount: $500</p>
      </section>

      {/* Approval Status Section */}
      <section className="approval-status">
        <h2>Approval Status</h2>
        <p>Status: {approvalStatus}</p>
        <button onClick={handleApprovalUpdate}>
          {approvalStatus === "Approved" ? "Revoke Approval" : "Approve"}
        </button>
      </section>

      {/* Goods Received Section */}
      <section className="goods-received">
        <h2>Goods Received</h2>
        <p>{receivedGoods ? "Goods have been received." : "Goods not yet received."}</p>
        <button onClick={handleGoodsReceived} disabled={receivedGoods}>
          Mark as Received
        </button>
      </section>
    </div>
  );
};

export default ProcurementOrders;
