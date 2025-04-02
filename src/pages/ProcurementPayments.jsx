import React, { useState } from "react";
import PaymentFilter from "../components/payment/PaymentFilter";
import CreatePaymentForm from "../components/payment/CreatePaymentForm";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProcurementPayments.css";
import Budgets from "../components/payment/Budgets";

const ProcurementPayments = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [totalBudget, setTotalBudget] = useState(50000);
  const [showBudget, setShowBudget] = useState(false);

  const [paymentData, setPaymentData] = useState([
    {
      id: "67e9f988b76cd88b54b104c2",
      payment_date: "2023-10-05T00:00:00.000+00:00",
      payment_method: "Transfer",
      amount: 2000,
      reference_number: "PAY-2023-001",
      notes: "Partial payment for invoice INV-2023-001",
      processed_by: "67e9f8484d2b0484b7b5b1af",
      status: "ชำระแล้ว",
    },
    {
      id: "67e9f9aab76cd88b54b104c4",
      payment_date: "2024-01-15T00:00:00.000+00:00",
      payment_method: "Cheque",
      amount: 0,
      reference_number: "PAY-2024-001",
      notes: "Awaiting approval",
      processed_by: "แม่",
      status: "ค้างชำระ",
    },
    {
      id: "67e9f9aab76cd88b54b104c5",
      payment_date: "2024-01-20T00:00:00.000+00:00",
      payment_method: "Cash",
      amount: 5000,
      reference_number: "PAY-2024-002",
      notes: "Full payment for invoice INV-2024-002",
      processed_by: "พ่อ",
      status: "ชำระแล้ว",
    },
  ]);

  const handleCreate = (newEntry) => {
    const newId = Date.now().toString();
    const installments = parseInt(newEntry.installments);
    const currentInstallment = parseInt(newEntry.currentInstallment);
    const isInstallment = newEntry.payment_method === "Installment";
    const installmentAmount = isInstallment
      ? parseFloat((newEntry.amount / installments).toFixed(2))
      : null;

    const createdEntry = {
      id: newId,
      ...newEntry,
      installments: isInstallment ? installments : null,
      installmentAmount,
      currentInstallment: isInstallment ? currentInstallment : null,
    };

    setPaymentData((prev) => [...prev, createdEntry]);
    setShowForm(false);
  };

  const filteredData = paymentData.filter((item) => {
    const matchStatus = filterStatus ? item.status === filterStatus : true;
    const matchSearch =
      item.processed_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const totalPaid = paymentData.reduce(
    (sum, p) => sum + (p.status === "ชำระแล้ว" ? p.amount : 0),
    0
  );
  const remainingBudget = totalBudget - totalPaid;

  const headers = [
    { key: "reference_number", label: "ใบชำระ" },
    { key: "payment_date", label: "วันที่ชำระเงิน" },
    { key: "payment_method", label: "วิธีการชำระ" },
    { key: "amount", label: "จำนวนเงิน" },
    { key: "installment_display", label: "การผ่อนชำระ" },
    { key: "processed_by", label: "ผู้ดำเนินการ" },
    { key: "notes", label: "หมายเหตุ" },
    { key: "status", label: "สถานะ" },
  ];

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("th-TH");

  const renderCell = (key, value, row) => {
    if (key === "payment_date") return formatDate(value);
    if (key === "amount") return value.toFixed(2);
    if (key === "status") {
      return (
        <span
          className={
            value === "ชำระแล้ว"
              ? "procurement-payments-status-paid"
              : "procurement-payments-status-pending"
          }
        >
          {value}
        </span>
      );
    }

    if (key === "installment_display") {
      if (row.payment_method === "Installment") {
        return `${row.installmentAmount?.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} / ${row.installments} งวด (งวดที่ ${row.currentInstallment})`;
      }
      return "-";
    }

    return value;
  };

  return (
    <div className="procurement-payments">
      <h1 className="procurement-payments-title">Procurement Payments</h1>

      <div className="payment-toolbar">
        <button
          className="create-payment-button"
          onClick={() => setShowForm(true)}
        >
          + สร้างข้อมูลใหม่
        </button>

        <button
          className="budget-toggle-button"
          onClick={() => setShowBudget(prev => !prev)}
        >
          📊 งบประมาณ
        </button>

        <div className="filter-group">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="payment-search-input"
              placeholder="ค้นหา ID หรือผู้ดำเนินการ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <PaymentFilter onStatusChange={setFilterStatus} />
        </div>
      </div>
      {showBudget && (
  <Budgets
    show={showBudget}
    onClose={() => setShowBudget(false)}
    paymentData={paymentData}
    totalBudget={totalBudget}
    setTotalBudget={setTotalBudget}
  />
)}

      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>สร้างข้อมูลใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePaymentForm
            onCreate={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>

      <table className="procurement-payments-table">
        <thead>
          <tr className="procurement-payments-header-row">
            <th className="procurement-payments-header">ลำดับ</th>
            {headers.map((header) => (
              <th key={header.key} className="procurement-payments-header">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((payment, index) => (
            <tr key={payment.id} className="procurement-payments-row">
              <td className="procurement-payments-cell">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              {headers.map((header) => (
                <td key={header.key} className="procurement-payments-cell">
                  {renderCell(header.key, payment[header.key], payment)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
          &laquo;
        </button>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        <span className="current-page">{currentPage}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
        <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default ProcurementPayments;
