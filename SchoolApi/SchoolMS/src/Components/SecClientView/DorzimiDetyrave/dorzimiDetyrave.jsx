import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dorzimiDetyrave.css";

const HomeworkSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:7189/api/homeworkSubmission")
      .then(response => setSubmissions(response.data))
      .catch(error => console.error("Gabim gjatë marrjes së dorëzimeve:", error));
  }, []);

  const filteredSubmissions = submissions.filter((item) =>
    `${item.studentFirstName} ${item.titleName} ${item.status}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const translateStatus = (status) => { switch (status) {  case "Submitted": return "Dorëzuar"; case "Graded":  return "Vlerësuar"; case "Late":  return "Me vonesë"; default:  return status;}};


  return (
    <section className="submission-section">
      <div className="submission-card">
        <div className="back-arrow2" onClick={() => navigate("/clientView")}>
          <span className="arrow">←</span> Kthehu
        </div>
        <h2>📬 Lista e Dorëzimeve të Detyrave</h2>
        <p className="description">
          Më poshtë është lista e dorëzimeve të detyrave nga nxënësit me statusin dhe notën përkatëse.
        </p>
        <input  type="text"  placeholder="🔍 Kërko sipas emrit të nxënësit, titullit ose statusit..." className="search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="submission-list">
          {filteredSubmissions.map((submission, index) => (
            <div key={index} className="submission-item">
              <div className="submission-content">
                <h3>{submission.studentFirstName}</h3>
                <hr/>
                <p><strong>Detyra:</strong> {submission.titleName}</p>
                <p><strong>Statusi:</strong> 
                  <span className={`status-tag status-${submission.status.toLowerCase()}`}>
                   {translateStatus(submission.status)}
                  </span>
                </p>
                <p><strong>Nota:</strong> {submission.grade ?? "N/A"}</p>
                <p><strong>Dorëzuar më:</strong> {formatDate(submission.submittedAt)}</p>
              </div>
              <div className="submission-download">
                 {submission.filePath ? (   <a  href={submission.filePath}  target="_blank"  rel="noopener noreferrer"  className="download-btn"  download > Shkarko </a> ) : (
                  <span className="no-file">Pa file</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeworkSubmissions;
