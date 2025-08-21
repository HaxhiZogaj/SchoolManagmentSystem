import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./departamentet.css";

const Departamentet = () => {
  const [departamentet, setDepartamentet] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("card");

  useEffect(() => {
    axios.get("https://localhost:7189/api/department")
      .then(response => setDepartamentet(response.data))
      .catch(error => console.error("Gabim gjatë marrjes së departamenteve:", error));
  }, []);

  const filteredDepartamentet = departamentet.filter((dep) =>
    `${dep.departmentName} ${dep.description}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

/*   return (
    <section className="class-section">
      <div className="class-card">
                      <div className="back-arrow2" onClick={() => navigate("/clientView")}>
  <span className="arrow">←</span> Kthehu
        </div>
        <h2>🏫 Departamentet e Shkollës</h2>
        <p className="description">
          Më poshtë janë të listuara të gjitha departamentet akademike të shkollës sonë me përshkrimet përkatëse.
        </p>
        <input
          type="text"
          placeholder="🔍 Kërko departamentin ose përshkrimin..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="class-list">
          {filteredDepartamentet.map((dep, index) => (
            <div key={index} className="class-item">
              <h3>{dep.departmentName}</h3>
              <hr />
              <p><strong>Përshkrimi:</strong> {dep.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ); */

   return (
    <section className="class-section">
      <div className="class-card">
        <div className="back-arrow2" onClick={() => navigate("/clientView")}>
          <span className="arrow">←</span> Kthehu
        </div>
        <h2>🏫 Departamentet e Shkollës</h2>
        <p className="description">
          Më poshtë janë të listuara të gjitha departamentet akademike të shkollës sonë me
          përshkrimet përkatëse.
        </p>
        <div className="filters">
          <input
            type="text"
            placeholder="🔍 Kërko departamentin ose përshkrimin..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
          <div className="class-list">
            {filteredDepartamentet.map((dep, index) => (
              <div key={index} className="class-item">
                <h3>{dep.departmentName}</h3>
                <hr />
                <p>
                  <strong>Përshkrimi:</strong> {dep.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="class-table-container">
            <table className="class-table professional-table">
              <thead>
                <tr>
                  <th>Emri i Departamentit</th>
                  <th>Përshkrimi</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartamentet.map((dep, index) => (
                  <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                    <td>{dep.departmentName}</td>
                    <td>{dep.description}</td>
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

export default Departamentet;
