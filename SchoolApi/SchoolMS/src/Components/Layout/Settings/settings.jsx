import { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext.jsx";
import "./settings.css";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`settings-page ${theme}`}>
      <h2 className="settings-title">Settings</h2>

      <div className="settings-card">
        <div className="setting-item">
          <span className="setting-label">Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
