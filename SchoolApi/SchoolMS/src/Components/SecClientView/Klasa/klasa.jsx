import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./klasa.css";

const Klasa = () => {
  const [klasat, setKlasat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:7189/api/class")
      .then(response => setKlasat(response.data))
      .catch(error => console.error("Gabim gjatë marrjes së klasave:", error));
  }, []);

  const filteredKlasat = klasat.filter((klasa) =>
    `${klasa.className} ${klasa.section} ${klasa.teacherFirstName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="class-section">
      <div className="class-card">
                      <div className="back-arrow2" onClick={() => navigate("/clientView")}>
  <span className="arrow">←</span> Kthehu
        </div>
        <h2>📘 Lista e Klasave</h2>
        <p className="description">
          Më poshtë është lista e klasave dhe mësuesve kujdestarë për secilin vit akademik të caktuar.
        </p>
        <input
          type="text"
          placeholder="🔍 Kërko klasën, seksionin ose mësuesin..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="class-list">
          {filteredKlasat.map((klasa, index) => (
            <div key={index} className="class-item">
              <h3>{klasa.className}</h3>
              <span className="section-tag">Seksioni: {klasa.section}</span>
              <hr />
              <p><strong>Viti Akademik:</strong> {klasa.academicYear}</p>
              <hr />
              <p><strong>Mësuesi Kujdestar:</strong> {klasa.teacherFirstName}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Klasa;
