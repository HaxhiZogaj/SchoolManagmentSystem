import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./notat.css";

const Notat = () => {
  const [notat, setNotat] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gradeRes, classSubjectRes] = await Promise.all([
          axios.get("https://localhost:7189/api/grade"),
          axios.get("https://localhost:7189/api/homework/classsubject-dropdown") 
        ]);
        const subjectMap = {};
        classSubjectRes.data.forEach(item => {
          subjectMap[item.classSubjectId] = item.classSubjectName || "-";
        });

        const enrichedNotat = gradeRes.data.map(grade => ({
          ...grade,
          classSubjectName: subjectMap[grade.classSubjectId] || "-"
        }));

        setNotat(enrichedNotat);
        setClassSubjects(classSubjectRes.data);
      } catch (err) {
        console.error("Gabim gjatë marrjes së notave:", err);
      }
    };

    fetchData();
  }, []);

  const filteredNotat = notat.filter(item =>
    `${item.grade1} ${item.enrollmentStatus} ${item.classSubjectName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section className="grade-section">
      <div className="grade-card">
        <div className="back-arrow2" onClick={() => navigate("/clientView")}>
          <span className="arrow">←</span> Kthehu
        </div>
        <h2>📚 Notat e Nxënësve</h2>
        <p className="description">
          Lista e notave të dhëna për nxënësit sipas lëndëve dhe regjistrimeve përkatëse.
        </p>

        <input
          type="text"
          placeholder="🔍 Kërko për notë, status apo lëndë..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grade-list">
          {filteredNotat.map((item, index) => (
            <div key={index} className="grade-item">
              <h3>Nota: <strong>{item.score}</strong></h3>
              <span className={`status ${item.enrollmentStatus.toLowerCase()}`}>
                {item.enrollmentStatus === "Active" ? "Aktiv" : "Jo Aktiv"}
              </span>
              <hr />
              <p><strong>Grada:</strong> {item.grade1}</p>
              <p><strong>Lënda e Klasës:</strong> {item.classSubjectName}</p>
              <p><strong>Data e Provimit:</strong> {new Date(item.examDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Notat;