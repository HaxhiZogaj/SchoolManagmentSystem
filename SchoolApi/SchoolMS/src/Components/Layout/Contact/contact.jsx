import axios from "axios";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7189/api/contact", form);
      alert("Mesazhi u dërgua me sukses!");
      setForm({ fullName: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("Gabim gjatë dërgimit të mesazhit.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.infoBox}>
          <h2 style={styles.title}>Kontakti</h2>
          <p style={styles.text}>
            Jemi të gatshëm të dëgjojmë nga ju...
          </p>
          <div style={styles.infoItem}><strong>Adresa:</strong> <span>Rr. Nënë Tereza</span></div>
          <div style={styles.infoItem}><strong>Tel:</strong> <span>+383 44 123 456</span></div>
          <div style={styles.infoItem}><strong>Email:</strong> <span>info@transporti.com</span></div>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <h3 style={styles.formTitle}>Na dërgoni një mesazh</h3>
          <input type="text" name="fullName" placeholder="Emri i Plotë" value={form.fullName} onChange={handleChange} style={styles.input} required />
          <input type="email" name="email" placeholder="Email-i" value={form.email} onChange={handleChange} style={styles.input} required />
          <input type="text" name="subject" placeholder="Titulli" value={form.subject} onChange={handleChange} style={styles.input} />
          <textarea name="message" placeholder="Mesazhi juaj..." value={form.message} onChange={handleChange} style={styles.textarea} required></textarea>
          <button type="submit" style={styles.button}>Dërgo</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "80px 20px", 
    display: "flex",
    justifyContent: "center",
    minHeight: "70vh", 
    alignItems: "center", 
  },
  card: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "30px",
    maxWidth: "1000px", 
    width: "100%",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.07)",
    padding: "40px", 
    marginBottom: "0", 
  },
  infoBox: {
    flex: "1",
    minWidth: "350px", 
  },
  title: {
    fontSize: "32px", 
    color: "#2c3e50",
    marginBottom: "16px",
  },
  text: {
    fontSize: "16px", 
    color: "#555",
    marginBottom: "24px",
  },
  infoItem: {
    marginBottom: "14px",
    fontSize: "16px", 
    color: "#333",
  },
  form: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    minWidth: "350px", 
  },
  formTitle: {
    fontSize: "24px", 
    color: "#34495e",
    marginBottom: "8px",
  },
  input: {
    padding: "14px", 
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "14px", 
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "160px", 
    resize: "vertical",
  },
  button: {
    backgroundColor: "#e7d56e",
    color: "#000000",
    padding: "16px", 
    fontSize: "18px", 
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Contact;
