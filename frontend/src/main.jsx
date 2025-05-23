import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"; // Import App component
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App /> {/* App จะจัดการ routing ทั้งหมด */}
    </Router>
  </StrictMode>
);
