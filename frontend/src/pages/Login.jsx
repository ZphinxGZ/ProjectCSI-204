import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        username,
        password,
      });
      const { token, message } = response.data;
      localStorage.setItem("token", token); // Save token to localStorage
      setMessage(message || "Login successful");
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
        {/* <p className="text-sm mt-3">
          Don't have an account?{" "}
          <button
            className="text-blue-500 underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p> */}
        {message && <p className="mt-3 text-red-500">{message}</p>}
      </div>
    </div>
  );
}
