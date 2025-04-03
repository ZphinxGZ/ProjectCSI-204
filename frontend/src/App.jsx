import { Menus } from "./utils";
import Logo from "./assets/logohome.png";
import DesktopMenu from "./components/DesktopMenu";
import MobMenu from "./components/MobMenu";
import { useNavigate, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AddOrder from "./components/AddOrder";
import PRDetails from "./pages/PRDetails";
import AddPR from "./components/AddPR";
import Login from "./pages/Login";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard"; // Import the Dashboard component
import ProcurementOrders from "./pages/ProcurementOrders";
import OrderDetails from "./components/OrderDetails";
import ProcurementPayments from "./pages/ProcurementPayments";
import ProcurementWarehouse from "./pages/ProcurementWarehouse";
import ProcurementPR from "./pages/ProcurementPR";
import UserAccounts from "./pages/UserAccounts";
import UserRoles from "./pages/UserRoles";
import UserAudit from "./pages/UserAudit";
import UserSecurity from "./pages/UserSecurity";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/"); // Redirect to login
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthPage = location.pathname === "/";
    if (!token && !isAuthPage) {
      navigate("/"); // Redirect to login if no token
    }
  }, [navigate, location.pathname]);

  return (
    <div>
      {location.pathname !== "/" && (
        <header className="h-16 text-[15px] fixed top-0 left-0 right-0 flex-center bg-[#8EC5FC] z-50 navbar">
          <nav className="px-3.5 flex-center-between w-full max-w-7xl mx-auto">
            <button
              className="flex-center gap-x-3 z-[999] relative"
              onClick={() => navigate("/dashboard")} // Navigate to dashboard
            >
              <img src={Logo} alt="" className="size-8" />
              <h3 className="text-lg font-semibold">Home</h3>
            </button>
            <ul className="gap-x-1 lg:flex-center hidden">
              {Menus.map((menu) => (
                <DesktopMenu
                  menu={menu}
                  key={menu.name}
                  onClick={(link) => {
                    if (link) navigate(link);
                  }}
                />
              ))}
            </ul>
            <div className="flex-center gap-x-5">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
              <div className="lg:hidden">
                <MobMenu
                  Menus={Menus}
                  navigate={navigate}
                  onClick={(menu) => {
                    if (menu.onClick) menu.onClick(navigate);
                  }}
                />
              </div>
            </div>
          </nav>
        </header>
      )}
      <main className={location.pathname !== "/" ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-order" element={<AddOrder />} />
          <Route path="/pr-details/:prNumber" element={<PRDetails />} />
          <Route path="/add-pr" element={<AddPR />} />
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
      </main>
    </div>
  );
}
