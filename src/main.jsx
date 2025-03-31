import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App"; // Import App component
import Dashboard from "./pages/Dashboard";
import ProcurementOrders from "./pages/ProcurementOrders";
import OrderDetails from "./components/OrderDetails";
import ProcurementPayments from "./pages/ProcurementPayments";
import ProcurementWarehouse from "./pages/ProcurementWarehouse";
import ProcurementPR from "./pages/ProcurementPR";
import UserAccounts from "./pages/UserAccounts";
import UserRoles from "./pages/UserRoles";
import UserAudit from "./pages/UserAudit";
import UserSecurity from "./pages/UserSecurity";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App> {/* Wrap Routes with App */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/procurement/orders" element={<ProcurementOrders />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/procurement/payments" element={<ProcurementPayments />} />
          <Route path="/procurement/warehouse" element={<ProcurementWarehouse />} />
          <Route path="/procurement/pr" element={<ProcurementPR />} />
          <Route path="/user-management/accounts" element={<UserAccounts />} />
          <Route path="/user-management/roles" element={<UserRoles />} />
          <Route path="/user-management/audit" element={<UserAudit />} />
          <Route path="/user-management/security" element={<UserSecurity />} />
        </Routes>
      </App>
    </Router>
  </StrictMode>
);
