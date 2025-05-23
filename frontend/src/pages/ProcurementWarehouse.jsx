import React, { useState, useEffect } from "react";
import AddStockForm from "../components/AddStockForm";
import { Modal } from "react-bootstrap"; // Import Modal from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./ProcurementWarehouse.css";

const ProcurementWarehouse = () => {
  const [stockDetailsList, setStockDetailsList] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("Main Warehouse");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawalLogs, setWithdrawalLogs] = useState([]);
  const itemsPerPage = 5;

  const headers = [
    { key: "item", label: "ชื่อสินค้า" },
    { key: "type", label: "ประเภท" },
    { key: "unit", label: "หน่วย" },
    { key: "price", label: "ราคา" },
    { key: "minStock", label: "สต๊อกขั้นต่ำ" },
    { key: "storage", label: "ที่จัดเก็บ" },
    { key: "remaining", label: "คงเหลือ" },
    { key: "action", label: "การกระทำ" },
  ];

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await fetch("http://localhost:3001/api/inventory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          const formattedData = data.inventoryItems.map((item, index) => ({
            id: index + 1,
            item: item.name,
            type: item.category,
            unit: item.unit,
            price: item.unit_cost,
            minStock: item.min_order,
            storage: "N/A", // Assuming storage location is not provided in the API
            remaining: item.current_quantity,
          }));
          setStockDetailsList(formattedData);
        } else {
          console.error("Failed to fetch inventory:", data.message);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const handleAddStock = (newItem) => {
    setStockDetailsList((prevList) => [
      ...prevList,
      { id: prevList.length + 1, ...newItem },
    ]);
    setShowAddModal(false);
  };

  const handleWithdraw = (id, amount) => {
    setStockDetailsList((prevList) =>
      prevList.map((stock) =>
        stock.id === id
          ? { ...stock, remaining: Math.max(stock.remaining - amount, 0) }
          : stock
      )
    );
    const withdrawnItem = stockDetailsList.find((stock) => stock.id === id);
    setWithdrawalLogs((prevLogs) => [
      ...prevLogs,
      { item: withdrawnItem.item, amount, date: new Date().toLocaleString() },
    ]);
    checkLowStock(id);
  };

  const checkLowStock = (id) => {
    const stock = stockDetailsList.find((item) => item.id === id);
    if (stock.remaining < stock.minStock) {
      alert(`สินค้าต่ำกว่าระดับขั้นต่ำ: ${stock.item}. กำลังสร้าง PR อัตโนมัติ...`);
      createPR(stock);
    }
  };

  const createPR = (stock) => {
    console.log(`สร้าง PR สำหรับสินค้า: ${stock.item}, จำนวนขั้นต่ำ: ${stock.minStock}`);
    // Logic to create PR can be added here
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

  const totalPages = Math.ceil(stockDetailsList.length / itemsPerPage);
  const paginatedData = stockDetailsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const paginationButtons = [];
    const totalPages = Math.ceil(stockDetailsList.length / itemsPerPage);
  
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
          <button
            key={i}
            className={`pagination-button ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 3) {
        paginationButtons.push(
          <button
            key={1}
            className="pagination-button"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        );
        if (currentPage > 4) {
          paginationButtons.push(<span key="start-ellipsis">...</span>);
        }
      }
  
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);
  
      for (let i = startPage; i <= endPage; i++) {
        paginationButtons.push(
          <button
            key={i}
            className={`pagination-button ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
  
      if (currentPage < totalPages - 3) {
        if (currentPage < totalPages - 4) {
          paginationButtons.push(<span key="end-ellipsis">...</span>);
        }
        paginationButtons.push(
          <button
            key={totalPages}
            className="pagination-button"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }
  
    return (
      <div className="pagination">
        {currentPage > 1 && (
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </button>
        )}
        {paginationButtons}
        {currentPage < totalPages && (
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt;
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="procurement-orders">
      <h1 className="procurement-orders-title">Procurement Warehouse</h1>
      <div className="warehouse-selector">
        <label htmlFor="warehouse">เลือกคลังสินค้า: </label>
        <select
          id="warehouse"
          value={selectedWarehouse}
          onChange={(e) => setSelectedWarehouse(e.target.value)}
        >
          <option value="Main Warehouse">Main Warehouse</option>
          <option value="Secondary Warehouse">Secondary Warehouse</option>
        </select>
      </div>
      <button
        className="procurement-orders-add-button"
        onClick={() => setShowAddModal(true)}
      >
        เพิ่มสินค้า
      </button>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มสินค้าใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddStockForm
            onAddStock={handleAddStock}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal.Body>
      </Modal>
      <table className="procurement-orders-table">
        <thead>
          <tr className="procurement-orders-header-row">
            {headers.map((header) => (
              <th key={header.key} className="procurement-orders-header">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((stock) => (
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
      {renderPagination()}
      <h2>บันทึกการเบิกจ่ายพัสดุ</h2>
      <ul>
        {withdrawalLogs.map((log, index) => (
          <li key={index}>
            {log.date}: เบิก {log.amount} {log.item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcurementWarehouse;
