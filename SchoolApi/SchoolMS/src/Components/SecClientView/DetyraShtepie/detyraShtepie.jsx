import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./detyraShtepie.css";

const Homework = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeworkRes, classSubjectRes] = await Promise.all([
          axios.get("https://localhost:7189/api/homework"),
          axios.get("https://localhost:7189/api/homework/classsubject-dropdown")
        ]);

        const subjectMap = {};
        classSubjectRes.data.forEach(item => {
          subjectMap[item.classSubjectId] = item.classSubjectName;
        });

        const enrichedHomeworks = homeworkRes.data.map(hw => ({
          ...hw,
          classSubjectName: subjectMap[hw.classSubjectId] || "-"
        }));

        setHomeworks(enrichedHomeworks);
      } catch (error) {
        console.error("Gabim gjatë ngarkimit të detyrave:", error);
      }
    };

    fetchData();
  }, []);

  const filteredHomeworks = homeworks.filter((item) =>
    `${item.title} ${item.description} ${item.classSubjectName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="homework-section">
      <div className="homework-card">
        <div className="back-arrow2" onClick={() => navigate("/clientView")}>
          <span className="arrow">←</span> Kthehu
        </div>
        <h2>📚 Lista e Detyrave të Shtëpisë</h2>
        <p className="description">
          Më poshtë gjendet lista e detyrave të shtëpisë të publikuara nga mësuesit për klasat e ndryshme.
        </p>
        <input
          type="text"
          placeholder="🔍 Kërko sipas titullit, përshkrimit apo klasës/lëndës..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="homework-list">
          {filteredHomeworks.map((homework, index) => (
            <div key={index} className="homework-item">
              <div className="homework-left">
                <h3>{homework.title}</h3>
                <p><strong>Përshkrimi:</strong> {homework.description}</p>
                <p><strong>Lenda e Klases:</strong> {homework.classSubjectName}</p>
                <p><strong>Afati:</strong> {new Date(homework.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="homework-right">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append("homeworkId", homework.homeworkId);
                    formData.append("studentId", 2); 
                    formData.append("file", e.target.file.files[0]);

                    axios.post("https://localhost:7189/api/homeworksubmission/upload", formData)
                      .then(() => alert("Detyra u dërgua me sukses!"))
                      .catch((err) => console.error("Gabim gjatë dërgimit:", err));
                  }}
                >
                  <label>Zgjidh dokumentin:</label>
                  <input name="file" type="file" accept=".pdf,.doc,.docx,.xlsx,.xls" required />
                  <button type="submit">📤 Dërgo</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Homework;