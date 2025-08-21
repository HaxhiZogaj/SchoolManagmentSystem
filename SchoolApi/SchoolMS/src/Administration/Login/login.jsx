 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://localhost:7189/api/Users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get("content-type") || "";
      let data = contentType.includes("application/json") ? await res.json() : null;

      if (!res.ok) {
        setMessage(data?.message || "Login failed");
        return;
      }

      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("username", data.username);

      setUser({
        token: data.token,
        role: data.role,
        username: data.username,
      });

      navigate("/clientView");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Kyqu</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p className="register-link">
        Nuk keni llogari?{" "}
        <span onClick={() => navigate("/register")}>Regjistrohuni</span>
      </p>

      {message && <p className="message error">{message}</p>}
    </div>
  );
}
 

