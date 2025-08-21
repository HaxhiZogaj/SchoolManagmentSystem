import { useState } from "react";
import { FaBars, FaBookOpen, FaBuilding, FaCalendarAlt, FaCaretDown, FaCaretUp, FaChalkboardTeacher, FaClipboardList, FaCog, FaEnvelope, FaGraduationCap, FaHome, FaInfoCircle, FaUpload, FaUserAlt, FaUsers, FaUserShield } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Administration/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const { user } = useAuth();
  const role = localStorage.getItem("userRole");

  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  const toggleClientDropdown = () => {
    setClientDropdownOpen(!clientDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="top-section">
        <button className="hamburger" onClick={toggleSidebar}>
          <FaBars />
        </button>
        {isOpen && <h3 className="sidebar-title">Menu</h3>}
      </div>

      <nav>
        <ul className="sidebar-links">

          {/* Admin Panel Dropdown */}
          {(role === "Admin" || role === "Teacher") && (
            <li className="dropdown-toggle">
               <NavLink to="adminPanel" className="dropdown-header" onClick={() => { toggleAdminDropdown(); }}>
                <FaUserShield className="icon" />
                {isOpen && <span>Admin Panel</span>}
                {isOpen && (adminDropdownOpen ? <FaCaretUp className="dropdown-caret" /> : <FaCaretDown className="dropdown-caret" />)}
              </NavLink>

              {adminDropdownOpen && isOpen && (
                <ul className="dropdown-items">
                  <li><NavLink to="/teacher"><FaChalkboardTeacher className="icon" /> {isOpen && <span>Mesuesit</span>}</NavLink></li>
                  <li><NavLink to="/class"><FaUserAlt className="icon" /> {isOpen && <span>Klasa</span>}</NavLink></li>
                  <li><NavLink to="/classSubject"><FaGraduationCap className="icon" /> {isOpen && <span>Lenda Klases</span>}</NavLink></li>
                  <li><NavLink to="/department"><FaBuilding className="icon" /> {isOpen && <span>Department</span>}</NavLink></li>
                  <li><NavLink to="/enrollment"><FaClipboardList className="icon" /> {isOpen && <span>Regjistrimi</span>}</NavLink></li>
                  <li><NavLink to="/grade"><FaChalkboardTeacher className="icon" /> {isOpen && <span>Notat</span>}</NavLink></li>
                  <li><NavLink to="/parent"><FaUserAlt className="icon" /> {isOpen && <span>Prinderit</span>}</NavLink></li>
                  <li><NavLink to="/student"><FaGraduationCap className="icon" /> {isOpen && <span>Studentet</span>}</NavLink></li>
                  <li><NavLink to="/subject"><FaCog className="icon" /> {isOpen && <span>Lendet</span>}</NavLink></li>
                  <li><NavLink to="/timeTable"><FaCalendarAlt className="icon" /> {isOpen && <span>Orari</span>}</NavLink></li>
                  <li><NavLink to="/homework"><FaBookOpen className="icon" /> {isOpen && <span>Detyrat e Shtepise</span>}</NavLink></li>
                  <li><NavLink to="/homeworkSubmission"><FaUpload className="icon" /> {isOpen && <span>Dorzimi i detyrave</span>}</NavLink></li>
 <hr />
                  <li><NavLink to="/scheduler"><FaCalendarAlt className="icon" /> {isOpen && <span>Menaxhimi Takimeve</span>}</NavLink></li>
 <hr/>
                  <li><NavLink to="/users"><FaUsers className="icon" /> {isOpen && <span>Perdoruesit</span>}</NavLink></li>
                </ul>
              )}
            </li>
          )}

          {/* Dashboard */}
          <li><NavLink to="/dashboard"><FaHome className="icon" /> {isOpen && <span>Dashbordi</span>}</NavLink></li>


        {/* Client View Dropdown */}
<li className="dropdown-toggle">
  <NavLink to="/clientView" className="dropdown-header" onClick={() => { toggleClientDropdown(); }}>
    <FaUsers className="icon" />
    {isOpen && <span>Kontrolli Shkollor</span>}
    {isOpen && (clientDropdownOpen ? <FaCaretUp className="dropdown-caret" /> : <FaCaretDown className="dropdown-caret" />)}
  </NavLink>

  {clientDropdownOpen && isOpen && (
    <ul className="dropdown-items">
      <li><NavLink to="/mesuesit"><FaChalkboardTeacher className="icon" /> {isOpen && <span>Mesuesit</span>}</NavLink></li>
      <li><NavLink to="/studentet"><FaGraduationCap className="icon" /> {isOpen && <span>Studentët</span>}</NavLink></li>
      <li><NavLink to="/klasa"><FaUserAlt className="icon" /> {isOpen && <span>Klasat</span>}</NavLink></li>
      <li><NavLink to="/lendetEKlasave"><FaGraduationCap className="icon" /> {isOpen && <span>Lenda Klases</span>}</NavLink></li>
      <li><NavLink to="/departamentet"><FaBuilding className="icon" /> {isOpen && <span>Departamentet</span>}</NavLink></li>
      <li><NavLink to="/regjistrimet"><FaClipboardList className="icon" /> {isOpen && <span>Regjistrimi</span>}</NavLink></li>
      <li><NavLink to="/notat"><FaChalkboardTeacher className="icon" /> {isOpen && <span>Notat</span>}</NavLink></li>
      <li><NavLink to="/prindrit"><FaUserAlt className="icon" /> {isOpen && <span>Prinderit</span>}</NavLink></li>
      <li><NavLink to="/lendet"><FaCog className="icon" /> {isOpen && <span>Lendet</span>}</NavLink></li>
      <li><NavLink to="/orari"><FaCalendarAlt className="icon" /> {isOpen && <span>Orari</span>}</NavLink></li>
      <li><NavLink to="/detyraShtepie"><FaBookOpen className="icon" /> {isOpen && <span>Detyra Shtepie</span>}</NavLink></li>
      <li><NavLink to="/dorzimiDetyrave"><FaUpload className="icon" /> {isOpen && <span>Dorezimi Detyrave </span>}</NavLink></li>
 <hr />
                  <li><NavLink to="/schedulerReadonly"><FaCalendarAlt className="icon" /> {isOpen && <span>Menaxhimi Takimeve</span>}</NavLink></li>
 

    </ul>
  )}
</li>


          {/* Static Links */}
          <li><NavLink to="/aboutus"><FaInfoCircle className="icon" /> {isOpen && <span>Rreth Nesh</span>}</NavLink></li>
          <li><NavLink to="/contact"><FaEnvelope className="icon" /> {isOpen && <span>Kontakti</span>}</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
