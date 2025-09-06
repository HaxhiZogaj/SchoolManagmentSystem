import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Administration/AuthContext";
import "./navbar.css";

const links = [
/*   { path: "/pjesmarrja", label: "Pjesmarresit" },  { path: "/klasa", label: "Klasa" },
 */  
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




