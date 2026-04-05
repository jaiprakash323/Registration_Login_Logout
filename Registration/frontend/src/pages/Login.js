import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 import
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // 👈 hook for navigation

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", form);
      localStorage.setItem("token", res.data.access);
      alert("Logged in!");

      // ✅ Navigate to dashboard after login
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <div className="Filinput">
        <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;