import { useEffect, useState } from "react";
import { getCandidates } from "../api/api";
import { getJobRoles } from "../api/api";
import { getDepartments } from "../api/api";
import { getPlacements } from "../api/api";
import {
  Users,
  Briefcase,
  Building2,
  CheckSquare,
  TrendingUp,
} from "lucide-react";

export default function Dashboard({ setActivePage }) {
  const [candidates, setCandidates] = useState([]);
  const [jobroles, setJobRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [placements, setPlacements] = useState([]);

  // fecth data for the first time
  useEffect(() => {
    const fetchData = async () => {
      const fetchCandidates = await getCandidates();
      setCandidates(fetchCandidates.data);

      const fetchJobRoles = await getJobRoles();
      setJobRoles(fetchJobRoles.data);

      const fetchDepartments = await getDepartments();
      setDepartments(fetchDepartments.data);

      const fetchPlacements = await getPlacements();
      setPlacements(fetchPlacements.data);
    };
    fetchData();
  }, []);

  const activePlacementLength = placements.filter(
    (p) => p.status === "active",
  ).length;

  const filterStatusLength = (status) =>
    candidates.filter((c) => c.status === status).length;
  const total = candidates.length || 1;

  // Calculate pipeline stats from the candidates array
  const stats = [
    {
      label: "Total Candidates",
      value: candidates.length,
      icon: Users,
      color: "Violet",
      page: "candidates",
    },
    {
      label: "Open Roles",
      value: jobroles.length,
      icon: Briefcase,
      color: "Yellow",
      page: "jobroles",
    },
    {
      label: "Departments",
      value: departments.length,
      icon: Building2,
      color: "Blue",
      page: "departments",
    },
    {
      label: "Active Placements",
      value: activePlacementLength,
      icon: CheckSquare,
      color: "Green",
      page: "placements",
    },
  ];

  const pipeline = [
    {
      label: "Applied",
      count: filterStatusLength("applied"),
      color: "blue",
    },
    {
      label: "Interviewed",
      count: filterStatusLength("interviewed"),
      color: "yellow",
    },
    { label: "Hired", count: filterStatusLength("hired"), color: "green" },
    {
      label: "Rejected",
      count: filterStatusLength("rejected"),
      color: "red",
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to recruitment command centre</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="stats-row">
        {stats.map(({ label, value, icon: Icon, color, page }) => (
          <div
            className="stat-card"
            key={label}
            style={{ cursor: "pointer", borderLeft: `3px solid ${color}` }}
            onClick={() => setActivePage(page)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div className="stat-value" style={{ color }}>
                {value}
              </div>
              <Icon size={18} style={{ color, opacity: 0.7 }} />
            </div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Hiring pipeline visual */}
        <div className="card">
          <h3
            style={{
              marginBottom: "1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <TrendingUp size={18} /> Hiring Pipeline
          </h3>

          {/* stat bar */}
          <div className="pipeline-bar">
            {pipeline.map(({ label, count, color }) => (
              <div
                key={label}
                className="pipeline-segment"
                title={`${label}: ${count}`}
                style={{
                  flex: count || 0.1, // minimum width even when count is 0
                  background: color,
                  opacity: 0.85,
                }}
              />
            ))}
          </div>

          {/* pipline */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginTop: "1rem",
              flexWrap: "wrap",
            }}
          >
            {pipeline.map(({ label, count, color }) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: color,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "",
                  }}
                >
                  {label}: <strong>{count}</strong>
                </span>
              </div>
            ))}
          </div>

          {/* candidates table */}
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ marginBottom: "0.75rem", fontSize: "0.95rem" }}>
              Recent Candidates
            </h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.slice(0, 5).map((c) => (
                    <tr key={c?.id}>
                      <td>{c?.name}</td>
                      <td style={{ color: "" }}>{c?.role}</td>
                      <td>
                        <span className={`badge badge-${c?.status}`}>
                          {c?.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {candidates.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          color: "",
                          textAlign: "center",
                        }}
                      >
                        No candidates yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="card">
          <h3 style={{ marginBottom: "1.2rem" }}>Quick Snapshot</h3>
          {pipeline.map(({ label, count, color }) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.65rem 0",
                borderBottom: "1px solid var(--bg-border)",
              }}
            >
              <span style={{ color: "", fontSize: "0.88rem" }}>{label}</span>
              <span style={{ fontWeight: 700, color, fontSize: "1.1rem" }}>
                {count}
              </span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.65rem 0",
              marginTop: "0.5rem",
            }}
          >
            <span style={{ color: "", fontSize: "0.88rem" }}>
              Conversion Rate
            </span>
            <span style={{ fontWeight: 700, color: "#10b981" }}>
              {candidates.length
                ? Math.round((filterStatusLength("hired") / total) * 100)
                : 0}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
