import React, { useState } from "react";
import "../styles/UserSecurity.css"; // นำเข้าไฟล์ CSS

const UserSecurity = () => {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [timeoutDuration, setTimeoutDuration] = useState(15); // Timeout in minutes
  const [ipRestriction, setIpRestriction] = useState("");

  const handleMfaToggle = () => {
    setMfaEnabled(!mfaEnabled);
  };

  const handleTimeoutChange = (e) => {
    setTimeoutDuration(e.target.value);
  };

  const handleIpRestrictionChange = (e) => {
    setIpRestriction(e.target.value);
  };

  const handleSaveChanges = () => {
    alert("Security settings have been saved successfully!");
  };

  return (
    <div className="user-security">
      <h2>Security & Access Settings</h2>
      
      <div className="security-option">
        <label>
          <input
            type="checkbox"
            checked={mfaEnabled}
            onChange={handleMfaToggle}
            className="mfa-toggle"
          />
          Enable Multi-Factor Authentication (MFA)
        </label>
      </div>
      
      <div className="security-option">
        <label>
          Session Timeout (minutes):
          <input
            type="number"
            value={timeoutDuration}
            onChange={handleTimeoutChange}
            min="1"
            className="timeout-input"
          />
        </label>
      </div>
      
      <div className="security-option">
        <label>
          IP Restriction (Optional):
          <input
            type="text"
            value={ipRestriction}
            onChange={handleIpRestrictionChange}
            placeholder="Enter allowed IP address"
            className="ip-input"
          />
        </label>
      </div>

      <div className="button-container">
        <button className="confirm-button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserSecurity;
