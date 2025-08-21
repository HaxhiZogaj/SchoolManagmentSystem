import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./lendetEKlasave.css";

const LendetEKlasave = () => {
  const [lendet, setLendet] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:7189/api/classsubject")
      .then(response => setLendet(response.data))
      .catch(error => console.error("Gabim gjatë marrjes së lëndëve:", error));
  }, []);

  const filteredLendet = lendet.filter((item) =>
    `${item.className} ${item.subjectName} ${item.teacherFirstName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="class-section">
      <div className="class-card">
                      <div className="back-arrow2" onClick={() => navigate("/clientView")}>
  <span className="arrow">←</span> Kthehu
        </div>
        <h2>📚 Lëndët e Klasave</h2>
        <p className="description">
          Më poshtë janë të gjitha lëndët e caktuara për klasat përkatëse dhe mësuesit që i japin ato.
        </p>
        <input
          type="text"
          placeholder="🔍 Kërko klasën, lëndën ose mësuesin..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="class-list">
          {filteredLendet.map((lenda, index) => (
            <div key={index} className="class-item">
              <h3>{lenda.subjectName}</h3>
              <span className="section-tag">Klasa: {lenda.className}</span>
              <hr />
              <p><strong>Mësuesi:</strong> {lenda.teacherFirstName}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LendetEKlasave;
