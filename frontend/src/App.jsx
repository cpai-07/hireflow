import { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Departments from "./pages/Departments";
import JobRoles from "./pages/JobRoles";
import Placements from "./pages/Placements";
import "./index.css";

export default function App() {
  // initial page should be dashboard
  const [activePage, setActivePage] = useState("dashboard");
  const [toast, setToast] = useState(null);

  // showToast is passed down to every page so they can trigger notifications
  const showToast = (message) => {
    setToast(message);
  };

  // display page based on activePage
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard setActivePage={setActivePage} />;
      case "candidates":
        return <Candidates showToast={showToast} />;
      case "departments":
        return <Departments showToast={showToast} />;
      case "jobroles":
        return <JobRoles showToast={showToast} />;
      case "placements":
        return <Placements showToast={showToast} />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">{renderPage()}</main>
      {/* Toast appears only when there's a message */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
