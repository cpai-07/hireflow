import { useEffect, useState, useCallback } from "react";
import {
  getJobRoles,
  addJobRole,
  updateJobRole,
  deleteJobRole,
} from "../api/api";
import { Briefcase, Pencil, Trash2, Plus } from "lucide-react";

export default function JobRoles({ showToast }) {
  const [roles, setRoles] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    department: "",
    salaryBand: "",
    level: "Mid",
    openPositions: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchRoles = await getJobRoles();
      setRoles(fetchRoles.data);
    };
    fetchData();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({
      title: "",
      department: "",
      salaryBand: "",
      level: "Mid",
      openPositions: 1,
    });
    setModal(true);
  };
  const openEdit = (r) => {
    setEditing(r);
    setForm({ ...r });
    setModal(true);
  };

  const handleSubmit = async () => {
    if (!form.title) {
      alert("Role title is required.");
      return;
    }
    if (editing) {
      // edit roles
      await updateJobRole(editing.id, form);
      showToast("Job role updated");
    } else {
      // add roles
      await addJobRole(form);
      showToast("Job role added");
    }
    setModal(false);
    // update the data
    const updatedData = await getJobRoles();
    setRoles(updatedData.data);
  };

  // delete functionality
  const handleDelete = async (id, title) => {
    await deleteJobRole(id);
    showToast("Job role deleted");
    // update the data
    const updatedData = await getJobRoles();
    setRoles(updatedData.data);
  };

  const levelColor = { Junior: "blue", Mid: "yellow", Senior: "green" };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Job Roles</h1>
          <p>Manage open positions and salary bands</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Role
        </button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Level</th>
                <th>Salary Band</th>
                <th>Open Positions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <p>No job roles yet.</p>
                    </div>
                  </td>
                </tr>
              )}
              {roles.map((role) => (
                <tr key={role?.id}>
                  <td
                    style={{
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Briefcase size={15} color="var(--accent)" /> {role?.title}
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>
                    {role?.department}
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        background: `${levelColor[role?.level]}22`,
                        color: levelColor[role.level],
                      }}
                    >
                      {role?.level}
                    </span>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>
                    {role?.salaryBand || "—"}
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: "var(--accent)" }}>
                      {role?.openPositions}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => openEdit(role)}
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(role?.id, role?.title)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setModal(false)}
        >
          <div className="modal">
            <div className="modal-header">
              <h2>{editing ? "Edit Job Role" : "Add Job Role"}</h2>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Role Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Software Engineer"
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  placeholder="e.g. Engineering"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Level</label>
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                >
                  <option>Junior</option>
                  <option>Mid</option>
                  <option>Senior</option>
                </select>
              </div>
              <div className="form-group">
                <label>Open Positions</label>
                <input
                  type="number"
                  value={form.openPositions}
                  onChange={(e) =>
                    setForm({ ...form, openPositions: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <label>Salary Band</label>
              <input
                value={form.salaryBand}
                onChange={(e) =>
                  setForm({ ...form, salaryBand: e.target.value })
                }
                placeholder="e.g. €55,000 - €75,000"
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                {editing ? "Save Changes" : "Add Role"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
