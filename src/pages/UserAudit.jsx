import React, { useState } from "react";
import "../styles/UserAudit.css";  // นำเข้าไฟล์ CSS

const AuditMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userActivities, setUserActivities] = useState([
    { id: 1, user: "John Doe", action: "Login", timestamp: "2025-04-01 08:00" },
    { id: 2, user: "Jane Smith", action: "Password Reset", timestamp: "2025-04-01 09:15" },
    { id: 3, user: "John Doe", action: "Role Change", timestamp: "2025-04-01 10:00" },
    { id: 4, user: "Jane Smith", action: "Login", timestamp: "2025-04-01 10:30" },
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredActivities = userActivities.filter((activity) =>
    activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="audit-monitoring">
      <h2>Audit & Monitoring</h2>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by user or action"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.user}</td>
                <td>{activity.action}</td>
                <td>{activity.timestamp}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No activities found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuditMonitoring;
