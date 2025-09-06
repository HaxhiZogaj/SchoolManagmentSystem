import { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext.jsx";
import "./settings.css";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div className="setting-item">
        <span>Dark Mode</span>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Enable Dark Mode" : "Disable Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
