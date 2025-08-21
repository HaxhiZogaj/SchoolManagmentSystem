import axios from "axios";
import { useEffect, useState } from "react";
/* import "./prindrit.css";
 */
import { useNavigate } from "react-router-dom";

const Prinderit = () => {
  const [prindrit, setPrindrit] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:7189/api/parent")
      .then(res => setPrindrit(res.data))
      .catch(err => console.error("Gabim gjatë marrjes së prindërve:", err));
  }, []);

  const filteredPrindrit = prindrit.filter((p) =>
    `${p.firstName} ${p.lastName} ${p.username}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section className="class-section">
      <div className="class-card">
                      <div className="back-arrow2" onClick={() => navigate("/clientView")}>
  <span className="arrow">←</span> Kthehu
        </div>
        <h2>👨‍👩‍👧‍👦 Prindërit</h2>
        <p className="description">
          Lista e të gjithë prindërve të regjistruar në sistemin shkollor me të dhënat e tyre.
        </p>

        <input
          type="text"
          placeholder="🔍 Kërko emër, mbiemër ose username..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="class-list">
          {filteredPrindrit.map((p, index) => (
            <div key={index} className="class-item">
              <h3>{p.firstName} {p.lastName}</h3>
              <span className="status active">👤 {p.username}</span>
              <hr />
              <p><strong>Email:</strong> {p.email}</p>
               <hr />
              <p><strong>Tel:</strong> {p.phoneNumber}</p>
               <hr />
              <p><strong>Adresa:</strong> {p.address}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prinderit;
