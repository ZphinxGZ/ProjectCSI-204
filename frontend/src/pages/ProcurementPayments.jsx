import React, { useState, useEffect } from "react";
import PaymentFilter from "../components/payment/PaymentFilter";
import PaymentDetailModal from "../components/payment/PaymentDetailModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProcurementPayments.css";
import Budgets from "../components/payment/Budgets";

const ProcurementPayments = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [totalBudget, setTotalBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? parseFloat(saved) : 500000;
  });
  const [showBudget, setShowBudget] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ ไม่พบ token");
      return;
    }

    fetch("http://localhost:3001/api/purchase-requisitions", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลได้");
        return res.json();
      })
      .then((data) => {
        const requisitions = data.purchaseRequisitions || [];
        const transformed = requisitions.map((item) => ({
          id: item._id,
          payment_date: item.required_date,
          payment_method: "-",
          amount: item.total_amount,
          reference_number: `PAY-${item._id.slice(-4)}`,
          notes: item.notes || "-",
          processed_by: item.requester_id?.full_name || "ไม่ทราบชื่อผู้ขอ",
          status: item.status || "รอดำเนินการ",
        }));
        setPaymentData(transformed);
      })
      .catch((err) => console.error("❌ โหลดข้อมูลล้มเหลว:", err.message));
  }, []);

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
    if (key === "reference_number") {
      return (
        <button
          className="link-button"
          onClick={() => setSelectedPayment(row)}
        >
          {value}
        </button>
      );
    }

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
          className="budget-toggle-button"
          onClick={() => setShowBudget((prev) => !prev)}
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
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={headers.length + 1} className="text-center">
                ไม่มีข้อมูลใบชำระ
              </td>
            </tr>
          ) : (
            paginatedData.map((payment, index) => (
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
            ))
          )}
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

      {selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
};

export default ProcurementPayments;
