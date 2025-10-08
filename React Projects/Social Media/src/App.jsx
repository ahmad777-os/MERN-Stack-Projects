import React from "react";
import Feed from "./components/Feed/Feed";
import Sidebar from "./components/Sidebar/Sidebar";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const { theme } = useTheme();

  const appStyles = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: theme === "light" ? "#f5f5f5" : "#1e1e1e",
    color: theme === "light" ? "#000" : "#fff"
  };

  return (
    <div style={appStyles}>
      <Sidebar />
      <div style={{ flex: 1, padding: "16px" }}>
        <ThemeToggle />
        <Feed />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
