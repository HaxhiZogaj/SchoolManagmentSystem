import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientView.css";

function ClientView() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const roadmapSteps = ["Planifikimi", "Zhvillimi", "Testimi", "Live"];
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
       axios.get("https://localhost:7189/api/class"), axios.get("https://localhost:7189/api/classsubject"),  
       axios.get("https://localhost:7189/api/department"), axios.get("https://localhost:7189/api/timetable"),
        axios.get("https://localhost:7189/api/enrollment"),  axios.get("https://localhost:7189/api/grade"),
        axios.get("https://localhost:7189/api/parent"), axios.get("https://localhost:7189/api/student"),
        axios.get("https://localhost:7189/api/subject"), axios.get("https://localhost:7189/api/teacher"),
        axios.get("https://localhost:7189/api/homework"),axios.get("https://localhost:7189/api/homeworkSubmission"),
      ]);
    } catch (error) {
      console.error("Gabim gjatë marrjes së të dhënave:", error);
      setError("Dështoi në marrjen e të dhënave. Ju lutemi provoni përsëri më vonë.");
    } finally {
      setLoading(false);
    }
  };

  const routeMap = { 
    teacher: "/mesuesit", student: "/studentet", classes: "/klasa",
    classsubject: "/lendetEKlasave", department: "/departamentet", enrollment: "/regjistrimet",
    grade: "/notat",parent: "/prindrit", subject: "/lendet", timetable: "/orari",homework: "/detyraShtepie",homeworkSubmission: "/dorzimiDetyrave",
  };

  const cardDetails = {
    classes: { title: "🏫 Klasat", shortDesc: "Menaxhimi i klasave dhe seksioneve.", longDesc: "Moduli i klasave përfshin menaxhimin e emrave të klasave, seksioneve dhe kujdestarëve përkatës për çdo klasë akademike." },
    classsubject: { title: "📚 Lëndët e Klasës", shortDesc: "Lidhja e klasave me lëndët.", longDesc: "Lidh klasat me lëndët dhe mësuesit për të ndërtuar një strukturë të saktë të planit mësimor." },
    department: { title: "🏢 Departamentet", shortDesc: "Struktura akademike e shkollës.", longDesc: "Moduli i departamenteve përshkruan çdo njësi akademike, duke përfshirë drejtuesit dhe funksionet përkatëse." },
    enrollment: { title: "📝 Regjistrimet", shortDesc: "Procesi i regjistrimit të nxënësve.", longDesc: "Ndjek procesin e regjistrimit për nxënësit në klasat përkatëse, përfshirë datën dhe statusin e regjistrimit." },
    grade: {  title: "📊 Notat", shortDesc: "Vlerësimi akademik i nxënësve.", longDesc: "Ky modul përmban notat për lëndë të ndryshme, datat e provimeve dhe lidhjen me regjistrimet përkatëse." },
    parent: { title: "👪 Prindërit", shortDesc: "Informacioni i kontaktit të prindërve.", longDesc: "Regjistri përmban të dhëna personale dhe kontaktet e prindërve, të lidhura me nxënësit përkatës."},
    student: {  title: "🎓 Nxënësit",  shortDesc: "Të dhënat personale të nxënësve.", longDesc: "Ruhet informacioni për çdo nxënës, përfshirë datën e lindjes, gjininë, kontaktet dhe lidhjet familjare." },
    subject: { title: "📖 Lëndët", shortDesc: "Lista e lëndëve akademike.", longDesc: "Përmban emrat dhe kodet e lëndëve, të ndara sipas departamenteve përkatëse." },
    teacher: { title: "👨‍🏫 Mësuesit", shortDesc: "Stafi mësimor dhe informacioni përkatës.", longDesc: "Menaxhon informacionin për mësuesit, përfshirë datëlindjen, kontaktet dhe lëndët që japin." },
    timetable: { title: "🕒 Orari",  shortDesc: "Planifikimi i orarit javor të klasave.", longDesc: "Moduli përmban ditët, orët dhe lëndët që ndodhin në çdo periudhë të caktuar për klasat."},
    homework: { title: "📘 Detyre Shtepie",  shortDesc: "Detyrat e shtepis sipas planifikimit ditor.", longDesc: "Detyrat e shtepise te dergohen ne orare te caktuar deri ne kohen e limituar."},
    homeworkSubmission: { title: "⬆️ Dorezimi i detyrave",  shortDesc: "Dorezimi i detyrave te shtepise ne koh te caktuar.", longDesc: "Dorzimi behet duke derguare file tuaj ne faqen e detyrave te shtepise."},
    schedulerReadonly: { title: "🗓 Menaxhimi Takimit",  shortDesc: "Te gjitha takimet ndermjet secilit.", longDesc: "Informimi rreth mbledhjeve,takimeve etj i gjeni ne kete faqe nderjmet muesesve,nxenesve,drejtoract dhe prinderve."},
  };

  const getStepDescription = (step) => {
  switch (step) {
    case "Planifikimi":
      return "Definimi i objektivave dhe resurseve për modulin.";
    case "Zhvillimi":
      return "Zbatimi i funksionaliteteve dhe ndërtimi i UI.";
    case "Testimi":
      return "Verifikimi dhe testimi për të siguruar cilësinë.";
    case "Live":
      return "Vendosja në përdorim për përdoruesit.";
    default:
      return "";
  }
};


  return (
    <div className="client-view-container">
{/*       {loading && <p>Ngarkimi i të dhënave...</p>} */}
      {error && <p className="error">{error}</p>}

      <section className="school-management-info">
        <h2>📚 Sistemi i Menaxhimit të Shkollës</h2>
        <div className="info-item">
          <h3>🔑 Karakteristikat Kryesore</h3>
          <ul>  <li>Gjurmoni pjesëmarrjen dhe regjistrimin e nxënësve në kohë reale.</li>  <li>Menaxhoni oraret e klasave, lëndët dhe caktimet e mësuesve.</li>  <li>Organizoni të dhënat e nxënësve, prindërve dhe mësuesve në mënyrë të sigurt.</li>  </ul>
        </div>
      </section>

      <div className="grid-wrapper">
        {Object.entries(cardDetails).map(([key, { title, shortDesc, longDesc }]) => (
          <div key={key} className="collapsible-item">
            <div className="data-card">
              <h3>{title}</h3>
              <p className="short-description">{shortDesc}</p>
            </div>

            <div className="description-and-link">
              <p className="data-description">{longDesc}</p>

              <button
                className="navigate-button"
                onClick={() => navigate(routeMap[key] || `/${key}`)}
              >
                Shko te Moduli
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientView;
