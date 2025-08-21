import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>🚫 Nuk keni qasje në këtë faqe!</h1>
      <p>Ju nuk keni leje për të hyrë në këtë zonë. Ju lutemi kthehuni në faqen kryesore.</p>
      <button style={styles.button} onClick={() => navigate("/dashboard")}>Kthehu tek Faqja Kryesore</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
     color: "white",
    padding: "60px",
  },
  button: {
    marginTop: "20px",
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default Unauthorized;