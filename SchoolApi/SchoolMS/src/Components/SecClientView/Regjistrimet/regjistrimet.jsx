import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./regjistrimet.css";

const Regjistrimet = () => {
  const [enrollmentet, setEnrollmentet] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:7189/api/enrollment")
      .then(response => setEnrollmentet(response.data))
      .catch(error => console.error("Gabim gjatë marrjes së regjistrimeve:", error));
  }, []);

  const filteredEnrollmentet = enrollmentet.filter((item) =>
    `${item.studentFirstName} ${item.className}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="class-section">
      <div className="class-card">
                      <div className="back-arrow2" onClick={() => navigate("/clientView")}>
  <span className="arrow">←</span> Kthehu
        </div>
        <h2>📄 Regjistrimet e Nxënësve</h2>
        <p className="description">
          Më poshtë gjenden regjistrimet e nxënësve në klasat përkatëse bashkë me statusin dhe datën e regjistrimit.
        </p>
        <input
          type="text"
          placeholder="🔍 Kërko nxënësin ose klasën..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="class-list">
          {filteredEnrollmentet.map((item, index) => (
            <div key={index} className="class-item">
              <h3>{item.studentFirstName}</h3>
              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status === "Active" ? "Aktiv" : "Jo Aktiv"}
              </span>
              <hr />
              <p><strong>Klasa:</strong> {item.className}</p>
              <hr />
              <p><strong>Data e regjistrimit:</strong> {new Date(item.enrollmentDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Regjistrimet;
