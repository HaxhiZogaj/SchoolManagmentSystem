import { registerLicense } from "@syncfusion/ej2-base";
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-react-documenteditor/styles/material.css';
import { useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./Administration/AuthContext";

import './App.css';

import Login from "./Administration/Login/login";
import Register from "./Administration/Register/register";
import Users from "./Administration/Users/users";
import GenericGrid from "./Common/GenericGrid/genericGrid";
import AboutUs from "./Components/Layout/AboutUs/aboutus";
import AdminPanel from "./Components/Layout/AminPanel/adminPanel";
import ClientView from "./Components/Layout/ClientView/clientView";
import Contact from "./Components/Layout/Contact/contact";
import Dashboard from "./Components/Layout/Dashboard/dashboard";
import Footer from "./Components/Layout/Footer/footer";
import Navbar from "./Components/Layout/Navbar/navbar";
import Settings from "./Components/Layout/Settings/settings";
import Sidebar from "./Components/Layout/Sidebar/sidebar";
import UserInfo from "./Components/Layout/UserInfo/userInfo";

import Departamentet from "./Components/SecClientView/Departamentet/departamentet";
import DetyraShtepie from "./Components/SecClientView/DetyraShtepie/detyraShtepie";
import DorzimiDetyrave from "./Components/SecClientView/DorzimiDetyrave/dorzimiDetyrave";
import Klasa from "./Components/SecClientView/Klasa/klasa";
import Lendet from "./Components/SecClientView/Lendet/lendet";
import LendetEKlasave from "./Components/SecClientView/LendetEKlasave/lendetEKlasave";
import Mesuesit from "./Components/SecClientView/Mesuesit/mesuesit";
import Notat from "./Components/SecClientView/Notat/notat";
import Orari from "./Components/SecClientView/Orari/orari";
import Prindrit from "./Components/SecClientView/Prindrit/prindrit";
import Regjistrimet from "./Components/SecClientView/Regjistrimet/regjistrimet";
import Studentet from "./Components/SecClientView/Studentet/studentet";
import Unauthorized from "./Components/Unauthorized/unauthorized";

import Class from "./Pages/Class/class";
import ClassSubject from "./Pages/ClassSubject/classSubject";
import Department from "./Pages/Department/department";
import DocumentEditor from "./Pages/DocumentEditor/documentEditor";
import Enrollment from "./Pages/Enrollment/enrollment";
import Grade from "./Pages/Grade/grade";
import Homework from "./Pages/HomeWork/homework";
import HomeworkSubmission from "./Pages/HomeworkSubmission/homeworkSubmission";
import Scheduler from "./Pages/Scheduler/scheduler";



import NotificationBanner from "./Common/NotificationBanner/notificationBanner";
import SchedulerReadonly from "./Components/SecClientView/SchedulerReadonly/schedulerReadonly";
import Parent from "./Pages/Parent/parent";
import Student from "./Pages/Student/student";
import Subject from "./Pages/Subject/subject";
import Teacher from "./Pages/Teacher/teacher";
import TimeTable from "./Pages/TimeTable/timeTable";
import { ThemeProvider } from "./ThemeContext.jsx";



registerLicense("Ngo9BigBOggjHTQxAR8/V1JEaF5cXmRCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXhecnVdRmJcUkxyW0dWYEk=");

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user, loading } = useAuth();
  const role = localStorage.getItem("userRole");
  if (loading) {return <div className="loading-spinner">Loading...</div>; }
  if (!user) { return <Navigate to="/login" replace />; }
  if (allowedRoles && !allowedRoles.includes(role)) { return <Navigate to="/unauthorized" replace />; }
  return element;
};

function AppContent() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (loading) {
    return (
      <div className="app-loading-screen">
        <div className="loading-content">Loading application...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {user && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        {user && <Navbar toggleSidebar={toggleSidebar} />}
        <div className="content-body">
          <Routes>
           <Route path="/" element={  user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace /> } />
            
           <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
           <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
           
           <Route path="/mesuesit" element={<PrivateRoute element={<Mesuesit />} />} />
           <Route path="/studentet" element={<PrivateRoute element={<Studentet />} />} />
           <Route path="/klasa" element={<PrivateRoute element={<Klasa />} />} />
           <Route path="/lendetEKlasave" element={<PrivateRoute element={<LendetEKlasave />} />} />
           <Route path="/departamentet" element={<PrivateRoute element={<Departamentet />} />} />
           <Route path="/regjistrimet" element={<PrivateRoute element={<Regjistrimet />} />} />
           <Route path="/notat" element={<PrivateRoute element={<Notat />} />} />
           <Route path="/prindrit" element={<PrivateRoute element={<Prindrit />} />} />
           <Route path="/lendet" element={<PrivateRoute element={<Lendet />} />} />
           <Route path="/orari" element={<PrivateRoute element={<Orari />} />} />
           <Route path="/detyraShtepie" element={<PrivateRoute element={<DetyraShtepie />} />} />
           <Route path="/dorzimiDetyrave" element={<PrivateRoute element={<DorzimiDetyrave />} />} />
           <Route path="/schedulerReadonly" element={<PrivateRoute element={<SchedulerReadonly />} />} />

            <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />


           <Route path="/users" element={<PrivateRoute element={<Users />} allowedRoles={["Admin"]} />} />
           <Route path="/unauthorized" element={<PrivateRoute element={<Unauthorized />}/>} />
           <Route path="/adminPanel" element={<PrivateRoute element={<AdminPanel />} allowedRoles={["Admin", "Teacher"]} />} />
           <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
           <Route path="/aboutus" element={<PrivateRoute element={<AboutUs />} />} />
           <Route path="/clientView" element={<PrivateRoute element={<ClientView />} />} />
           <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
            
           <Route path="/homeworkSubmission" element={<PrivateRoute element={<HomeworkSubmission />} allowedRoles={["Admin", "Teacher"]} />} />
           <Route path="/homework" element={<PrivateRoute element={<Homework />} allowedRoles={["Admin", "Teacher"]} />} />
           <Route path="/class" element={<PrivateRoute element={<Class />} allowedRoles={["Admin", "Teacher"]} />} />
           <Route path="/classSubject" element={<PrivateRoute element={<ClassSubject />} allowedRoles={["Admin", "Teacher"]} />} />
           <Route path="/department" element={<PrivateRoute element={<Department />} allowedRoles={["Admin"]} />} />
           <Route path="/enrollment" element={<PrivateRoute element={<Enrollment />} allowedRoles={["Admin"]} />} />
           <Route path="/grade" element={<PrivateRoute element={<Grade />} allowedRoles={["Admin", "Teacher"]} />} />
           <Route path="/parent" element={<PrivateRoute element={<Parent />} allowedRoles={["Admin"]} />} />
           <Route path="/student" element={<PrivateRoute element={<Student />} allowedRoles={["Admin"]} />} />
           <Route path="/subject" element={<PrivateRoute element={<Subject />} allowedRoles={["Admin", "Teacher"]} />} />
           <Route path="/teacher" element={<PrivateRoute element={<Teacher />} allowedRoles={["Admin"]} />} />
           <Route path="/timeTable" element={<PrivateRoute element={<TimeTable />} allowedRoles={["Admin", "Teacher"]} />} />
           <Route path="/documentEditor" element={<PrivateRoute element={<DocumentEditor />} allowedRoles={["Admin", "Teacher"]} />} />
           <Route path="/scheduler" element={<PrivateRoute element={<Scheduler />} allowedRoles={["Admin"]} />} />


          <Route path="/genericGrid" element={<PrivateRoute element={<GenericGrid />} allowedRoles={["Admin", "Teacher"]} />} />
          <Route path="/notificationBanner" element={<PrivateRoute element={<NotificationBanner />} allowedRoles={["Admin", "Teacher"]} />} />


          <Route path="/userInfo" element={<PrivateRoute element={<UserInfo />} />} />

           <Route path="*" element={<Navigate to={user ? "/clientView" : "/login"} replace />} />
          </Routes>
        </div>
        {user && <Footer />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;