import { Link } from "react-router-dom";
import "./adminPanel.css";

const Home = () => {
const gridCards = [
/*   { path: "/attendance", title: "Pjesëmarrja", description: "Ndjekja e regjistrave dhe statistikave të pranishmërisë së studentëve." },
 */  
  { path: "/class", title: "Klasa", description: "Menaxho oraret dhe strukturat e klasave." },
  { path: "/classSubject", title: "Lënda e Klasës", description: "Shiko dhe cakto lëndët për klasat e ndryshme." },
  { path: "/department", title: "Departamenti", description: "Menaxho departamentet dhe ndarjet e fakulteteve." },
  { path: "/enrollment", title: "Regjistrimi", description: "Kontrollo regjistrimet dhe të dhënat e studentëve të rinj." },
  { path: "/grade", title: "Notat", description: "Monitoro notat dhe raportet e përparimit të studentëve." },
  { path: "/parent", title: "Prindërit", description: "Shiko profilin e prindërve dhe informacionin për fëmijët e tyre." },
  { path: "/student", title: "Studentët", description: "Qasje në të gjitha të dhënat dhe performancën e studentëve." },
  { path: "/subject", title: "Lëndët", description: "Menaxho lëndët akademike dhe detyrimet e tyre." },
  { path: "/teacher", title: "Mësuesit", description: "Ndjek mësuesit dhe kurset që u janë caktuar." },
  { path: "/timeTable", title: "Orari", description: "Shiko dhe përditëso oraret akademike." },
    { path: "/homework", title: "Detyrat e Shtepise", description: "Shiko dhe përditëso oraret akademike." },
 { path: "/homeworkSubmission", title: "Dergimi i Detyrave te Shtepise", description: "Shiko dhe përditëso oraret akademike." }
];


  return (
    <div className="home-container">
      <h1 className="home-title">Mirësevini në Panelin Kryesor</h1>
      <p className="home-subtitle">Këtu mund të shikoni statistikat dhe informacionet kryesore.</p>

      <div className="home-cards">
        {gridCards.map((grid, index) => (
          <div className="card" key={index}>
            <h2>{grid.title}</h2>
            <p>{grid.description}</p>
            <Link to={grid.path} className="card-button">Shiko Gridin</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;