import React from "react";
import { useTheme } from "../context/ThemeContext"; // corrected import

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={styles.button}>
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

const styles = {
  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#eee",
    fontSize: "1rem",
    marginBottom: "16px"
  }
};

export default ThemeToggle;
