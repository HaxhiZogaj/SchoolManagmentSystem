import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./orari.css";

const Orari = () => {
  const [oraret, setOraret] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [timetableRes, classSubjectRes] = await Promise.all([
          axios.get("https://localhost:7189/api/timetable"),
          axios.get("https://localhost:7189/api/homework/classsubject-dropdown")
        ]);

        const subjectMap = {};
        classSubjectRes.data.forEach(item => {
          subjectMap[item.classSubjectId] = item.classSubjectName;
        });

        const enrichedOraret = timetableRes.data.map(o => ({
          ...o,
          classSubjectName: subjectMap[o.classSubjectId] || "-"
        }));

        setOraret(enrichedOraret);
        setClassSubjects(classSubjectRes.data);
      } catch (err) {
        console.error("Gabim gjatë marrjes së orarit:", err);
      }
    };

    fetchData();
  }, []);

  const filteredOraret = oraret.filter((o) =>
    `${o.dayOfWeek} ${o.roomNumber} ${o.classSubjectName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section className="class-section">
      <div className="class-card">
        <div className="back-arrow2" onClick={() => navigate("/clientView")}>
          <span className="arrow">←</span> Kthehu
        </div>
        <h2>📅 Orari i Lëndëve</h2>
        <p className="description">
          Ky seksion paraqet orarin e mësimeve me ditë, orar dhe numrin e klasës.
        </p>

        <input
          type="text"
          placeholder="🔍 Kërko ditën, klasën apo lëndën..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="class-list">
          {filteredOraret.map((o, index) => (
            <div key={index} className="class-item">
              <h3>📘 {o.dayOfWeek}</h3>
              <span className="status active">🕓 {o.startTime} - {o.endTime}</span>
              <hr />
              <p><strong>Klasa:</strong> {o.roomNumber}</p>
              <p><strong>Lënda:</strong> {o.classSubjectName}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Orari;