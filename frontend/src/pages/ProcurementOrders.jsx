import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // Import axios for API calls

const ProcurementOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    poNumber: "",
    supplier: "",
    status: "รอดำเนินการ",
    quantity: "",
    unit: "",
    description: "",
    receivedDate: "",
    referenceNumber: ""
  });
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get("http://localhost:3001/api/purchase-requisitions", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        if (error.response && error.response.status === 401) {
          navigate("/"); // Redirect to login if unauthorized
        }
      }
    };

    fetchOrders();
  }, [navigate]);

  const saveOrders = (newOrders) => {
    setOrders(newOrders); // Update state only, no localStorage usage
  };

  const handleAddOrder = () => {
    const updatedOrders = [...orders, { ...newOrder, id: orders.length + 1 }];
    saveOrders(updatedOrders);
    setShowModal(false);
    setNewOrder({
      poNumber: "",
      supplier: "",
      status: "รอดำเนินการ",
      quantity: "",
      unit: "",
      description: "",
      receivedDate: "",
      referenceNumber: ""
    });
  };

  const filteredOrders = orders.filter(order =>
    (order.poNumber.includes(searchTerm) || order.supplier.includes(searchTerm)) &&
    (filterStatus === "" || order.status === filterStatus)
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="procurement-orders">
      <h1 className="procurement-orders-title">Procurement Orders</h1>

      <div className="payment-toolbar">
        <div className="filter-group">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="payment-search-input"
              placeholder="ค้นหา PO หรือ ผู้ขาย"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="payment-filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">ทั้งหมด</option>
            <option value="เสร็จสมบูรณ์">เสร็จสมบูรณ์</option>
            <option value="รอดำเนินการ">รอดำเนินการ</option>
          </select>
        </div>
      </div>

      <table className="procurement-payments-table">
        <thead>
          <tr className="procurement-payments-header-row">
            <th className="procurement-payments-header">ลำดับ</th>
            <th className="procurement-payments-header">ใบสั่งซื้อ</th>
            <th className="procurement-payments-header">ผู้ขาย</th>
            <th className="procurement-payments-header">สถานะ</th>
            <th className="procurement-payments-header">ปริมาณการรับ</th>
            <th className="procurement-payments-header">หน่วยนับ</th>
            <th className="procurement-payments-header">คำอธิบาย</th>
            <th className="procurement-payments-header">วันที่รับ</th>
            <th className="procurement-payments-header">อ้างอิงหมายเลขใบสั่งซื้อ</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order, index) => (
            <tr key={order.id} className="procurement-payments-row">
              <td className="procurement-payments-cell">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="procurement-payments-cell">
                <button
                  className="link-button"
                  onClick={() => navigate(`/order-details/${order.poNumber}`)}
                >
                  {order.poNumber}
                </button>
              </td>
              <td className="procurement-payments-cell">{order.supplier}</td>
              <td className="procurement-payments-cell">{order.status}</td>
              <td className="procurement-payments-cell">{order.quantity}</td>
              <td className="procurement-payments-cell">{order.unit}</td>
              <td className="procurement-payments-cell">{order.description}</td>
              <td className="procurement-payments-cell">{order.receivedDate}</td>
              <td className="procurement-payments-cell">{order.referenceNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          &laquo;
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span className="current-page">{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มใบสั่งซื้อ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>หมายเลข PO</Form.Label>
              <Form.Control type="text" value={newOrder.poNumber} onChange={(e) => setNewOrder({ ...newOrder, poNumber: e.target.value })} />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>ผู้ขาย</Form.Label>
              <Form.Control type="text" value={newOrder.supplier} onChange={(e) => setNewOrder({ ...newOrder, supplier: e.target.value })} />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>ปริมาณการรับ</Form.Label>
              <Form.Control type="number" value={newOrder.quantity} onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })} />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>หน่วยนับ</Form.Label>
              <Form.Control type="text" value={newOrder.unit} onChange={(e) => setNewOrder({ ...newOrder, unit: e.target.value })} />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>คำอธิบาย</Form.Label>
              <Form.Control type="text" value={newOrder.description} onChange={(e) => setNewOrder({ ...newOrder, description: e.target.value })} />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>วันที่รับ</Form.Label>
              <Form.Control type="date" value={newOrder.receivedDate} onChange={(e) => setNewOrder({ ...newOrder, receivedDate: e.target.value })} />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>อ้างอิงหมายเลขใบสั่งซื้อ</Form.Label>
              <Form.Control type="text" value={newOrder.referenceNumber} onChange={(e) => setNewOrder({ ...newOrder, referenceNumber: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>ยกเลิก</Button>
          <Button variant="primary" onClick={handleAddOrder}>เพิ่ม</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProcurementOrders;
