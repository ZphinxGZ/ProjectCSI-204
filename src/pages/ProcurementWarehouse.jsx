import React, { useState } from "react";
import "./ProcurementWarehouse.css"; 
// Import the same CSS file used in ProcurementOrders for consistent styling  

const ProcurementWarehouse = () => {
  const [stockDetailsList, setStockDetailsList] = useState([
    // Mock data for stock details
    { id: 1, item: "ปากกา", minStock: 50, storage: "A1", remaining: 120 },
    { id: 2, item: "ดินสอ", minStock: 30, storage: "B2", remaining: 25 },
    { id: 3, item: "ยางลบ", minStock: 20, storage: "C3", remaining: 50 },
  ]);

  const headers = [
    // Headers for the stock table
    { key: "item", label: "รายการ" },
    { key: "minStock", label: "สต๊อกขั้นต่ำ" },
    { key: "storage", label: "ที่จัดเก็บ" },
    { key: "remaining", label: "คงเหลือ" },
    { key: "action", label: "การกระทำ" },
  ];

  const handleWithdraw = (id, amount) => {
    setStockDetailsList((prevList) =>
      prevList.map((stock) =>
        stock.id === id
          ? { ...stock, remaining: Math.max(stock.remaining - amount, 0) }
          : stock
      )
    );
  };

  const renderCell = (key, value, stock) => {
    if (key === "action") {
      return (
        <button
          className="procurement-orders-withdraw-button styled-withdraw-button"
          onClick={() => {
            const amount = parseInt(prompt(`Enter amount to withdraw for ${stock.item}:`), 10);
            if (!isNaN(amount) && amount > 0) {
              handleWithdraw(stock.id, amount);
            }
          }}
        >
          เบิกจ่าย
        </button>
      );
    }
    if (typeof value === "number") {
      return value.toFixed(2);
    }
    return value;
  };

  return (
    <div className="procurement-orders">
      <h1 className="procurement-orders-title">Procurement Warehouse</h1>
      <table className="procurement-orders-table">
        <thead>
          <tr className="procurement-orders-header-row">
            {headers.map((header) => (
              <th key={header.key} className="procurement-orders-header">{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stockDetailsList.map((stock) => (
            <tr key={stock.id} className="procurement-orders-row">
              {headers.map((header) => (
                <td key={header.key} className="procurement-orders-cell">
                  {renderCell(header.key, stock[header.key], stock)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcurementWarehouse;
