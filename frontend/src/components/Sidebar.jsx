import {
  Users,
  Briefcase,
  Building2,
  CheckSquare,
  LayoutDashboard,
} from "lucide-react";

// array of Nav items to display sidebar
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
  { label: "Candidates", icon: Users, page: "candidates" },
  { label: "Job Roles", icon: Briefcase, page: "jobroles" },
  { label: "Departments", icon: Building2, page: "departments" },
  { label: "Placements", icon: CheckSquare, page: "placements" },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-dot" />
        <span>HireFlow</span>
      </div>

      {/* iterating to each object to display nv bar  */}
      {NAV_ITEMS.map(({ label, icon: Icon, page }) => (
        <button
          key={page}
          className={`nav-item ${activePage === page ? "active" : ""}`}
          onClick={() => setActivePage(page)}
        >
          <Icon size={17} />
          {label}
        </button>
      ))}
    </div>
  );
}
