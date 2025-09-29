/* import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Administration/AuthContext";
import "./navbar.css";

const links = [

  { path: "/lendetEKlasave", label: "Lenda Klases" }, { path: "/departamentet", label: "Department" },
  { path: "/regjistrimet", label: "Regjistrimi" }, { path: "/notat", label: "Notat" },
  { path: "/prindrit", label: "Prinderit" }, { path: "/studentet", label: "Studentet" },
  { path: "/lendet", label: "Lendet" }, { path: "/mesuesit", label: "Mesuesit" },
  { path: "/orari", label: "Orari" }, { path: "/users", label: "Perdoruesit" },
  { path: "/aboutus", label: "Rreth Nesh" }, { path: "/contact", label: "Kontakti" },
  { path: "/clientView", label: "Kontrolli Shkollor" }, { path: "/dashboard", label: "Dashbordi" },
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const filteredLinks = links.filter((link) => link.label.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleLogout = () => { localStorage.removeItem("userToken"); setUser(null); navigate("/login");};

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SchoolMS</Link>
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  />
        {searchTerm && ( <>  <button  className="clear-button" onClick={() => setSearchTerm("")} title="Clear" >  ×
            </button> <ul className="search-results">  {filteredLinks.map((link) => (  <li key={link.path}>  <Link to={link.path}>{link.label}</Link>  </li>  ))} </ul>  </>
        )}
      </div>

      <div className="navbar-auth">
        {user ? (
          <div  className="user-profile" onClick={() => setDropdownOpen(!dropdownOpen)} style={{ cursor: "pointer" }} >
            <span className="username">{user.username}</span>
            <img className="avatar" src={user.profileImage || "https://i.pravatar.cc/40"} />
            <span className={`arrow ${dropdownOpen ? "open" : ""}`}>&#9662;</span>
            {dropdownOpen && ( <div className="dropdown-menu">  <Link to="/userinfo">User Info</Link> <Link to="/grades">Grades</Link>   <Link to="/settings">Settings</Link>
 <hr />
              <button onClick={handleLogout} className="logout-button">  Logout </button>
              </div>
            )}
          </div>
        ) : (
          <> <Link to="/login" className="auth-btn login-btn">   Login  </Link>
            <Link to="/register" className="auth-btn register-btn">  Register </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
 */
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Administration/AuthContext";
import "./navbar.css";

const links = [
  { path: "/lendetEKlasave", labelKey: "nav.subjectsClass" },
  { path: "/departamentet", labelKey: "nav.departments" },
  { path: "/regjistrimet", labelKey: "nav.registrations" },
  { path: "/notat", labelKey: "nav.grades" },
  { path: "/prindrit", labelKey: "nav.parents" },
  { path: "/studentet", labelKey: "nav.students" },
  { path: "/lendet", labelKey: "nav.subjects" },
  { path: "/mesuesit", labelKey: "nav.teachers" },
  { path: "/orari", labelKey: "nav.schedule" },
  { path: "/users", labelKey: "nav.users" },
  { path: "/aboutus", labelKey: "nav.aboutUs" },
  { path: "/contact", labelKey: "nav.contact" },
  { path: "/clientView", labelKey: "nav.clientView" },
  { path: "/dashboard", labelKey: "nav.dashboard" },
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false); // Renamed state for clarity
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setUserDropdownOpen(false); // Close the entire dropdown after selecting a language
    setLanguageMenuOpen(false);
  };

  // Toggle language menu on CLICK
  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(prevState => !prevState);
  };

  const filteredLinks = links.filter((link) => 
    t(link.labelKey).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/login");
  };

  const currentLanguage = i18n?.language || 'en';

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">{t('nav.schoolMs')}</Link>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder={t('nav.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <>
            <button className="clear-button" onClick={() => setSearchTerm("")} title="Clear">
              ×
            </button>
            <ul className="search-results">
              {filteredLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{t(link.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="navbar-auth">
        {user ? (
          <div
            className="user-profile"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            style={{ cursor: "pointer" }}
          >
            <span className="username">{user.username}</span>
            <img className="avatar" src={user.profileImage || "https://i.pravatar.cc/40"} alt="Avatar" />
            <span className={`arrow ${userDropdownOpen ? "open" : ""}`}>&#9662;</span>
            {userDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/userinfo">{t('nav.userInfo')}</Link>
                <Link to="/grades">{t('nav.grades')}</Link>
                <Link to="/settings">{t('nav.settings')}</Link>
                
                {/* NEW: Language Option with Dropdown (CLICK TO OPEN) */}
                <button 
                  className="dropdown-item-with-submenu"
                  onClick={toggleLanguageMenu} // Changed to onClick
                >
                  <span>Language ({currentLanguage.toUpperCase()})</span>
                  <span className={`arrow ${languageMenuOpen ? "open" : ""}`}>&#9662;</span>
                </button>
                {/* Language choices dropdown */}
                {languageMenuOpen && (
                  <div className="language-dropdown-list">
                    <button onClick={() => changeLanguage('sq')}>Shqip (SQ)</button>
                    <button onClick={() => changeLanguage('en')}>English (EN)</button>
                    <button onClick={() => changeLanguage('tr')}>Türkçe (TR)</button>
                    <button onClick={() => changeLanguage('de')}>Deutsch (DE)</button>
                  </div>
                )}
                {/* END NEW */}

                <hr />
                <button onClick={handleLogout} className="logout-button">
                  {t('nav.logout')}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="auth-btn login-btn">
              {t('nav.login')}
            </Link>
            <Link to="/register" className="auth-btn register-btn">
              {t('nav.register')}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;