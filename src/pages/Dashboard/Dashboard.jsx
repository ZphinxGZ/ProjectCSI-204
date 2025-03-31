import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";
import { FiPackage, FiTruck, FiBox, FiRefreshCw } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const stats = {
    totalProducts: 1200,
    lowStock: 50,
    incomingDeliveries: 300,
    outgoingOrders: 250,
  };

  const monthlyData = [
    { name: "Jan", incoming: 400, outgoing: 300 },
    { name: "Feb", incoming: 350, outgoing: 280 },
    { name: "Mar", incoming: 450, outgoing: 320 },
    { name: "Apr", incoming: 500, outgoing: 400 },
    { name: "May", incoming: 600, outgoing: 450 },
    { name: "Jun", incoming: 700, outgoing: 500 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <FiRefreshCw className="loading-icon" />
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="header">
        <div className="header-title">
          <MdOutlineInventory2 className="header-icon" />
          <div>
            <h1>Dashbord</h1>
            <p>ภาพรวมการดำเนินงานคลังสินค้าและการเคลื่อนไหวของสินค้า</p>
          </div>
        </div>
        <div className="header-actions">
          <span className="current-date">
            {new Date().toLocaleDateString("th-TH", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <button className="refresh-btn">
            <FiRefreshCw />
            <span>รีเฟรช</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-content">
            <h3>Total Products</h3>
            <p className="value">{stats.totalProducts}</p>
            <p className="change positive">
              <HiArrowTrendingUp /> +8.3% from last month
            </p>
          </div>
          <FiPackage className="card-icon" />
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="card-content">
            <h3>Low Stock</h3>
            <p className="value">{stats.lowStock}</p>
            <p className="change negative">
              <HiArrowTrendingDown /> -2.5% from last month
            </p>
          </div>
          <FiBox className="card-icon" />
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="card-content">
            <h3>Incoming Deliveries</h3>
            <p className="value">{stats.incomingDeliveries}</p>
            <p className="change positive">
              <HiArrowTrendingUp /> +12.7% from last month
            </p>
          </div>
          <FiTruck className="card-icon" />
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="card-content">
            <h3>Outgoing Orders</h3>
            <p className="value">{stats.outgoingOrders}</p>
            <p className="change positive">
              <HiArrowTrendingUp /> +5.3% from last month
            </p>
          </div>
          <FiBox className="card-icon" />
        </motion.div>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart">
          <h2>Monthly Inventory Movement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="incoming" fill="#6366F1" />
              <Bar dataKey="outgoing" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h2>Inventory Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOutgoing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="incoming"
                stroke="#6366F1"
                fill="url(#colorIncoming)"
              />
              <Area
                type="monotone"
                dataKey="outgoing"
                stroke="#F59E0B"
                fill="url(#colorOutgoing)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;