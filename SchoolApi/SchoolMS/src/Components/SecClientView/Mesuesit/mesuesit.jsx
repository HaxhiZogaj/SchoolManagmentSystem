import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mesuesit.css";

const Mesuesi = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [viewMode, setViewMode] = useState("card"); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7189/api/teacher")
      .then((response) => setTeachers(response.data))
      .catch((error) => console.error("Gabim gjatë marrjes së të dhënave:", error));
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch = `${teacher.firstName} ${teacher.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === "all" || teacher.gender.toLowerCase() === genderFilter;
    return matchesSearch && matchesGender;
  });

  return (
    <section className="teacher-section">
      <div className="teacher-card">
        <div className="back-arrow2" onClick={() => navigate("/clientView")}>
          <span className="arrow">←</span> Kthehu
        </div>
        <h2>📌 Lista e Mësuesve</h2>
        <p className="description">
          Më poshtë është lista e mësuesve të regjistruar në shkollë. Secili prej tyre ka një rol të
          rëndësishëm në edukimin e nxënësve dhe përfaqëson një pjesë të rëndësishme të stafit tonë
          akademik.
        </p>

        <div className="filters">
          <input
            type="text"
            placeholder="🔍 Kërko me ID, emër, mbiemër, prind..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="gender-select"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="all">Të gjithë gjinitë</option>
            <option value="mashkull">Mashkull</option>
            <option value="femer">Femër</option>
            <option value="tjetër">Tjetër</option>
          </select>
          <select
            className="view-mode-select"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option value="card">Pamje me Karta</option>
            <option value="table">Pamje me Tabelë</option>
          </select>
        </div>

        {viewMode === "card" ? (
          <div className="teacher-list">
            {filteredTeachers.map((teacher, index) => (
              <div key={index} className="teacher-item">
                <h3>
                  {teacher.firstName} {teacher.lastName}
                </h3>
                <span className={`gender ${teacher.gender.toLowerCase()}`}>
                  {teacher.gender === "Mashkull"
                    ? "♂ Mashkull"
                    : teacher.gender === "Femer"
                    ? "♀ Femër"
                    : "⚧ Tjetër"}
                </span>
                <hr />
                <p>
                  <strong>Departamenti:</strong> {teacher.departmentName}
                </p>
                <hr />
                <p>
                  <strong>Data e punësimit:</strong> {teacher.hireDate}
                </p>
                <hr />
                <p>
                  <strong>Kontakt:</strong> {teacher.email} | 📞 {teacher.phoneNumber}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="teacher-table-container">
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>Emri</th>
                  <th>Mbiemri</th>
                  <th>Gjinia</th>
                  <th>Departamenti</th>
                  <th>Data e Punësimit</th>
                  <th>Email</th>
                  <th>Telefon</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher, index) => (
                  <tr key={index}>
                    <td>{teacher.firstName}</td>
                    <td>{teacher.lastName}</td>
                    <td>
                      {teacher.gender === "Mashkull"
                        ? "♂ Mashkull"
                        : teacher.gender === "Femer"
                        ? "♀ Femër"
                        : "⚧ Tjetër"}
                    </td>
                    <td>{teacher.departmentName}</td>
                    <td>{teacher.hireDate}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Mesuesi;