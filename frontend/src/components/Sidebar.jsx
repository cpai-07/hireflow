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

export default function Sidebar() {
  return <div>Sidebar</div>;
}
