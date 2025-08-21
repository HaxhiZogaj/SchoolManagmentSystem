/* import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pjesmarrja.css";

const Pjesmarrja = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("https://localhost:7189/api/attendance/")
      .then((response) => setAttendanceData(response.data))
      .catch((error) =>
        console.error("Gabim gjatë marrjes së të dhënave:", error)
      );
  }, []);

  const filteredData = attendanceData.filter((entry) => {
    const matchesSearch = entry.enrollmentId
      ?.toString()
      .includes(searchTerm.trim());

    switch (filter) {
      case "present":
        return entry.status === "Present" && matchesSearch;
      case "absent":
        return entry.status === "Absent" && matchesSearch;
      case "active":
        return entry.enrollmentStatus === "Active" && matchesSearch;
      case "inactive":
        return entry.enrollmentStatus === "Inactive" && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  return (
    <section className="attendance-section">
      <div className="attendance-card">
        <div className="back-arrow2" onClick={() => navigate("/clientView")}>
    <span className="arrow">←</span> Kthehu
  </div>
        <h2>📌 Përmbledhje e Pjesëmarrjes</h2>
        <p className="description">
          Kjo listë tregon statusin e pjesëmarrjes për çdo student, me
          mundësi filtrimi sipas statusit dhe ID-së së regjistrimit.
        </p>

        <div className="attendance-controls">
  <input
    type="text"
    placeholder="🔍 Kërko me Enrollment ID..."
    className="search-bar"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <select
    className="filter-select"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  >
    <option value="all">Të gjitha</option>
    <option value="present">Prezent</option>
    <option value="absent">Mungesë</option>
    <option value="active">Aktiv</option>
    <option value="inactive">Joaktiv</option>
  </select>
</div>



        <div className="attendance-list">
          {filteredData.length === 0 ? (
            <p className="no-data">
               Nuk u gjetën të dhëna për filtrin e zgjedhur.
            </p>
          ) : (
            filteredData.map((entry, index) => (
              <div key={index} className="attendance-item">
                <div>
                  <strong>ID:</strong> {entry.attendanceId}
                </div>

                <div className={`status-badge ${entry.status.toLowerCase()}`}>
                  <strong>Statusi:</strong>{" "}
                  {entry.status === "Present" ? " I Pranishëm" : " Mungesë"}
                </div>

                <hr />

                <div>
                  <strong>Data:</strong>{" "}
                  {new Date(entry.date).toLocaleDateString("sq-AL")}
                </div>

                <hr />

                <div className={`enrollment-status ${entry.enrollmentStatus.toLowerCase()}`}>
                  <strong>Regjistrimi:</strong>{" "}
                  {entry.enrollmentStatus === "Active" ? " Aktiv" : " Joaktiv"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Pjesmarrja;
 */