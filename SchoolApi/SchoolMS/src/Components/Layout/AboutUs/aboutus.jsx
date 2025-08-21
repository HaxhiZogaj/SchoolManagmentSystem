import { useState } from "react";
import "./aboutus.css";

const cardData = [
  { icon: "🔍", title: "Frekuentimi",  text: "Monitorimi i pjesëmarrjes ditore të nxënësve.",  more: "Mësuesit regjistrojnë frekuentimin dhe sistemi e lidh me performancën për analiza të detajuara.",},
  { icon: "🏫", title: "Klasat", text: "Menaxhimi i klasave shkollore.", more: "Krijoni, editoni dhe shpërndani nxënësit në klasa sipas niveleve dhe programeve akademike.", },
  { icon: "📘", title: "Lëndët e Klasave", text: "Përcaktimi i lëndëve për çdo klasë.",  more: "Sistemi mundëson shtimin, heqjen dhe përcaktimin e orëve për çdo lëndë në çdo klasë.",},
  { icon: "🏢", title: "Departamentet", text: "Struktura organizative e shkollës.", more: "Çdo departament përmban lëndë specifike, staf të caktuar dhe program arsimor përkatës.",},
  { icon: "📝", title: "Regjistrimi", text: "Procesi i regjistrimit të studentëve.", more: "Lehtëson pranimet, transferimet dhe menaxhon aplikimet me dokumentacion të plotë.",},
  { icon: "📊", title: "Notat", text: "Vlerësimi i nxënësve sipas kritereve.", more: "Mësuesit mund të fusin nota, të shohin mesataret dhe të gjenerojnë raporte për çdo student.",},
  { icon: "👨‍👩‍👧", title: "Prindërit",text: "Të dhëna për kontakt  me prindërit.", more: "Përdoret për dërgimin e njoftimeve, takimeve dhe përditësimeve rreth nxënësve të tyre.", },
  { icon: "🧒", title: "Nxënësit", text: "Të gjitha të dhënat e studentëve.", more: "Përfshin profilin, pranimet, rezultatet, frekuentimin dhe historikun arsimor.",},
  { icon: "📚", title: "Lëndët", text: "Lista e të gjitha lëndëve që mësohen.", more: "Përfshihen detaje si emri, kodi, kreditet dhe klasat ku mësohet lënda.",},
  { icon: "👨‍🏫", title: "Mësuesit", text: "Menaxhimi i stafit arsimor.", more: "Ruajtja e të dhënave të mësuesve, ngarkesës mësimore dhe orareve përkatëse.",},
  { icon: "📅", title: "Orari Mësimor", text: "Planifikimi i orareve pa konflikte.", more: "Algoritmi krijon orare në bazë të klasave, mësuesve dhe lëndëve që ata japin.",},
  { icon: "📩", title: "Komunikimi me Prindërit", text: "Njoftime  për progresin e fëmijëve.", more: "Përmes platformës digjitale, prindërit marrin raportime mujore dhe mund të komunikojnë me arsimtarët.",},
];

const AboutUs = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleMoreInfo = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="about-us-section">
      <div className="about-us-wrapper">
        <div className="intro-text">
          <p>
            <strong>Sistemi që Transformon Arsimin</strong> – Platformë gjithëpërfshirëse për menaxhimin e shkollave, digjitalizim të proceseve dhe përmirësim të përvojës arsimore për nxënësit, mësuesit dhe prindërit.
          </p>
        </div>

        <div className="about-grid">
          {cardData.map((card, index) => (
            <div key={index} className="about-card-container">
              <div className="about-card">
                <div className="about-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <button className="learn-more-btn" onClick={() => toggleMoreInfo(index)} > {expandedIndex === index ? "Mbylle" : "Njoftohu më shumë"} </button>
              </div>
              {expandedIndex === index && (
                <div className="about-card-details">  <p>{card.more}</p> </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
