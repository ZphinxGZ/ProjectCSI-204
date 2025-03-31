import React from "react";
import { FaFilter } from "react-icons/fa";
import "./PaymentFilter.css";

const PaymentFilter = ({ onStatusChange }) => {
  return (
    <div className="payment-filter">
      <FaFilter className="filter-icon" />
      <label htmlFor="status-filter">สถานะ:</label>
      <select
        id="status-filter"
        onChange={(e) => onStatusChange(e.target.value)}
        className="filter-select"
      >
        <option value="">ทั้งหมด</option>
        <option value="ชำระแล้ว">ชำระแล้ว</option>
        <option value="ค้างชำระ">ค้างชำระ</option>
      </select>
    </div>
  );
};

export default PaymentFilter;