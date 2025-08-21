import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./lendet.css";

const Lendet = () => {
  const [lendet, setLendet] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:7189/api/subject")
      .then(res => setLendet(res.data))
      .catch(err => console.error("Gabim gjatë marrjes së lëndëve:", err));
  }, []);

  const filteredLendet = lendet.filter((l) =>
    `${l.subjectName} ${l.departmentName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section className="class-section">
      <div className="class-card">
                      <div className="back-arrow2" onClick={() => navigate("/clientView")}>
  <span className="arrow">←</span> Kthehu
        </div>
        <h2>📘 Lëndët e Regjistruara</h2>
        <p className="description">
          Më poshtë është lista e lëndëve me emër, kod dhe departament përkatës.
        </p>

        <input
          type="text"
          placeholder="🔍 Kërko lëndë ose departament..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="class-list">
          {filteredLendet.map((l, index) => (
            <div key={index} className="class-item">
              <h3>{l.subjectName}</h3>
              <span className="status active">📘 {l.subjectCode}</span>
              <hr />
              <p><strong>Departamenti:</strong> {l.departmentName}</p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lendet;
