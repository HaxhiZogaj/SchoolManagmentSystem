import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./studentet.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [viewMode, setViewMode] = useState("card");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7189/api/student")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Gabim gjatë marrjes së të dhënave:", error));
  }, []);

  const filteredStudents = students.filter((s) => {
    const matchesSearch = `${s.firstName} ${s.lastName} ${s.parentFirstName} ${s.username}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === "all" || s.gender.toLowerCase() === genderFilter;
    return matchesSearch && matchesGender;
  });

  return (
    <section className="students-section">
      <div className="students-card">
        <div className="back-arrow2" onClick={() => navigate("/clientView")}>
          <span className="arrow">←</span> Kthehu
        </div>
        <h2>🎓 Lista e Nxënësve</h2>
        <p className="description">
          Më poshtë është lista e nxënësve të regjistruar në sistem me të dhënat e tyre bazë.
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

        {filteredStudents.length === 0 ? (
          <p className="no-data">Nuk u gjet asnjë nxënës me këto kritere.</p>
        ) : viewMode === "card" ? (
          <div className="students-list">
            {filteredStudents.map((s) => (
              <div key={s.studentId} className="student-item">
                <h3>
                  {s.firstName} {s.lastName}
                </h3>
                <span className={`gender ${s.gender.toLowerCase()}`}>
                  {s.gender === "Mashkull"
                    ? "♂ Mashkull"
                    : s.gender === "Femer"
                    ? "♀ Femër"
                    : "⚧ Tjetër"}
                </span>
                <hr />
                <p>
                  <strong>Datëlindja:</strong> {s.dateOfBirth}
                </p>
                <hr />
                <p>
                  <strong>Adresa:</strong> {s.address}
                </p>
                <hr />
                <p>
                  <strong>Nr Tel:</strong> {s.phoneNumber}
                </p>
                <hr />
                <p>
                  <strong>Data e Regjistrimit:</strong> {s.enrollmentDate}
                </p>
                <hr />
                <p>
                  <strong>Username:</strong> {s.username}
                </p>
                <hr />
                <p>
                  <strong>Prindi:</strong> {s.parentFirstName}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="students-table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Emri</th>
                  <th>Mbiemri</th>
                  <th>Gjinia</th>
                  <th>Datëlindja</th>
                  <th>Adresa</th>
                  <th>Nr Tel</th>
                  <th>Data e Regjistrimit</th>
                  <th>Username</th>
                  <th>Prindi</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.studentId} className={s.studentId % 2 === 0 ? "even-row" : "odd-row"}>
                    <td>{s.firstName}</td>
                    <td>{s.lastName}</td>
                    <td>{s.gender}</td> {/* Plain text for gender */}
                    <td>{s.dateOfBirth}</td>
                    <td>{s.address}</td>
                    <td>{s.phoneNumber}</td>
                    <td>{s.enrollmentDate}</td>
                    <td>{s.username}</td>
                    <td>{s.parentFirstName}</td>
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

export default Students;