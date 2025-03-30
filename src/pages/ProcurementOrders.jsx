import React, { useState } from "react";
import "./ProcurementOrders.css";

const ProcurementOrders = () => {
  const [approvalStatus, setApprovalStatus] = useState("Pending");
  const [receivedGoods, setReceivedGoods] = useState(false);

  const receiptDetailsList = [
    {
      id: 1,
      quantityReceived: 10,
      unit: "Boxes",
      itemDescription: "Office Supplies",
      receiptDate: "2023-10-01",
      referencePONumber: "12345",
    },
    {
      id: 2,
      quantityReceived: 5,
      unit: "Pallets",
      itemDescription: "Electronics",
      receiptDate: "2023-10-02",
      referencePONumber: "67890",
    },
    {
      id: 3,
      quantityReceived: 7,
      unit: "paper",
      itemDescription: "game",
      receiptDate: "2023-02-07",
      referencePONumber: "56432",
    },
  ];

  const handleApprovalUpdate = () => {
    setApprovalStatus(approvalStatus === "Approved" ? "Pending" : "Approved");
  };

  const handleGoodsReceived = () => {
    setReceivedGoods(true);
  };

  return (
    <div className="procurement-orders">
      <h1>Procurement Orders Page</h1>

      {receiptDetailsList.map((receipt) => (
        <section key={receipt.id} className="receipt-details">
          <h2>Receipt Details</h2>
          <p>Quantity Received: {receipt.quantityReceived}</p>
          <p>Unit: {receipt.unit}</p>
          <p>Item Description: {receipt.itemDescription}</p>
          <p>Receipt Date: {receipt.receiptDate}</p>
          <p>Reference PO Number: {receipt.referencePONumber}</p>

          {/* Approval and Goods Received Section */}
          <div className="approval-and-received">
            <h3>Approval and Goods Received</h3>
            <div>
              <h4>Approval Status</h4>
              <p>Status: {approvalStatus}</p>
              <button onClick={handleApprovalUpdate}>
                {approvalStatus === "Approved" ? "Revoke Approval" : "Approve"}
              </button>
            </div>
            <div>
              <h4>Goods Received</h4>
              <p>{receivedGoods ? "Goods have been received." : "Goods not yet received."}</p>
              <button onClick={handleGoodsReceived} disabled={receivedGoods}>
                Mark as Received
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProcurementOrders;
