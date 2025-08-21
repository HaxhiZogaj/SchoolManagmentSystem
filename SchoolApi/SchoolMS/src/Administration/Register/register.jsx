import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './register.css';

const roles = ["Admin", "Student", "Parent", "Teacher"];

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Student",
  });

  const [message, setMessage] = useState("");
  const [showLoginButton, setShowLoginButton] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://localhost:7189/api/Users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Regjistrimi u krye me sukses për rolin: ${data.role}`);
        setForm({ username: "", email: "", password: "", role: "Student" });
        setShowLoginButton(true);
      } else {
        setMessage(data.message || "Regjistrimi dështoi");
        setShowLoginButton(false);
      }
    } catch (err) {
      setMessage("Gabim: " + err.message);
      setShowLoginButton(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Krijo Llogari</h2>

        <label>Emri i përdoruesit</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Fjalëkalimi</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Roli</label>
        <select name="role" value={form.role} onChange={handleChange}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <button type="submit">Regjistrohu</button>
      </form>
        <p className="register-link">
          Keni llogari?{" "}
          <span onClick={() => navigate("/login")}>Kyqu</span>
        </p>


      {message && (
        <div className="message-area">
          <p className="message">{message}</p>
          {showLoginButton && (
            <button className="login-link-button" onClick={() => navigate("/login")}>
              Mund të kyçeni tani
            </button>
          )}
        </div>
      )}
    </div>
    
  );
}


