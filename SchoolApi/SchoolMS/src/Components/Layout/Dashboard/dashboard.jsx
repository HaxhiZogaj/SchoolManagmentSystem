import { ArcElement, BarController, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, } from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { FaBook, FaBookOpen, FaChalkboardTeacher, FaUserGraduate, FaUsers, FaUserTie, } from "react-icons/fa";
import api from "../../../api";
import { getAllStudents } from "../../../Services/StudentApi";
import { getAllSubjects } from "../../../Services/SubjectApi";
import "./Dashboard.css";

ChartJS.register( ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement, BarController);
const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [classesCount, setClassesCount] = useState(0);
  const [parentsCount, setParentsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [subjectsCount, setSubjectsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try { const [   usersRes,  teachersRes,  classesRes,  parentsRes,  studentRes,  subjectRes,] = await Promise.all([
            api.get("/users"), api.get("/teacher"), api.get("/class"), api.get("/parent"), getAllStudents(), getAllSubjects(), ]);
        setUsersCount(usersRes?.data?.length || 0); setTeachersCount(teachersRes?.data?.length || 0);  setClassesCount(classesRes?.data?.length || 0); setParentsCount(parentsRes?.data?.length || 0); setStudentsCount(studentRes?.data?.length || 0); setSubjectsCount(subjectRes?.data?.length || 0);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };
    fetchData();
  }, []);

  
  const pieChartData = {
    labels: [ "Përdoruesit",  "Mësuesit",  "Klasat",  "Prindërit",  "Studentët",  "Lëndët", ],
    datasets: [ {  label: "Totali",   data: [   usersCount,  teachersCount,  classesCount, parentsCount, studentsCount,  subjectsCount, ],
    backgroundColor: [ "#007bff",  "#28a745", "#ffc107", "#dc3545",  "#17a2b8",  "#6f42c1",  ],  borderColor: "#fff", borderWidth: 2,  hoverOffset: 15, }, ],
  };

  const pieChartOptions = {
    plugins: { legend: {  position: "bottom",  labels: { color: "#333", font: { size: 14 } },  },  }, };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [  { label: "Matematik", data: [55, 30, 88, 92, 95, 74, 96], borderColor: "rgba(255, 99, 132, 1)", backgroundColor: "rgba(255, 99, 132, 0.2)",  tension: 0.3, },
      {  label: "Fizik", data: [18, 85, 30, 88, 50, 87, 89], borderColor: "rgba(54, 162, 235, 1)",  backgroundColor: "rgba(54, 162, 235, 0.2)", tension: 0.3, },
      { label: "Kimi", data: [82, 88, 85, 87, 91, 90, 92], borderColor: "rgba(255, 206, 86, 1)", backgroundColor: "rgba(255, 206, 86, 0.2)",  tension: 0.3, },
      { label: "Biologji", data: [75, 80, 78, 82, 85, 83, 86], borderColor: "rgba(75, 192, 192, 1)",  backgroundColor: "rgba(75, 192, 192, 0.2)", tension: 0.3, },
      { label: "Anglisht", data: [95, 90, 88, 82, 87, 81, 80], borderColor: "rgb(45, 37, 117)", backgroundColor: "rgba(75, 192, 192, 0.2)",  tension: 0.3, }, ],
  };

  const lineChartOptions = {
    responsive: true,  plugins: { legend: { position: "top", labels: { font: { size: 14 }, color: "#333" },  },
      title: {  display: true, text: "Notat e Studentëve gjatë muajve", font: { size: 18 },  color: "#444",  }, },
    scales: { y: {  beginAtZero: true,   max: 100,  }, },
  };

  const teachersHiringData = {
    labels: [ "Ardita Hoxha", "Blerim Krasniqi", "Elira Dauti", "Ilir Bajrami",  "Mirela Kola", ],
    datasets: [ {  label: "Viti i Punësimit",  data: [2015, 2017, 2019, 2016, 2018],   backgroundColor: "#6f42c1",  borderRadius: 10,  borderSkipped: false,  }, ],
  };

 const teachersHiringOptions = { indexAxis: "y", responsive: true, plugins: {  legend: { display: false },  title: { display: true,  font: { size: 16 },  color: "#333",  },},
  scales: { x: { type: 'linear',  min: 2000, max: 2025, ticks: {  stepSize: 1,  callback: (value) => value.toString(),  color: '#333',}, 
  title: {  display: true,  text: 'Viti',  font: { size: 14 },  color: '#444', }, }, y: { grid: { display: false }, ticks: {   color: '#333',  },}, },};


  return (
    <div className="dashboard-container">
      <div className="stats-grid">
        <div className="stat-box">  <FaUsers className="icon" />  <div> <h3>{usersCount}</h3>  <p>Perdoruesit</p> </div> </div>
        <div className="stat-box"> <FaChalkboardTeacher className="icon" /><div>   <h3>{teachersCount}</h3>  <p>Mesuesit</p> </div> </div>
        <div className="stat-box">  <FaBook className="icon" /> <div>  <h3>{classesCount}</h3>  <p>Klasat</p>  </div> </div>
        <div className="stat-box">  <FaUserTie className="icon" />  <div>  <h3>{parentsCount}</h3>  <p>Prinderit</p>  </div> </div>
        <div className="stat-box">  <FaUserGraduate className="icon" /> <div>   <h3>{studentsCount}</h3>   <p>Studentet</p> </div></div>
        <div className="stat-box">  <FaBookOpen className="icon" />  <div>   <h3>{subjectsCount}</h3>    <p>Lendet</p></div></div> </div>
      <div className="charts-row">  <div className="chart-section">   <Pie data={pieChartData} options={pieChartOptions} /> </div> <div className="grades-chart">  <Line data={lineChartData} options={lineChartOptions} /> </div> </div>
      <div className="chart-section" style={{ marginTop: "40px" }}>  <h4>Vitet e Punësimit të Mësuesve: </h4>  <Bar data={teachersHiringData} options={teachersHiringOptions} /> </div>
    </div>
  );
};

export default Dashboard;
