import { useEffect, useState, useCallback } from "react";
import {
  getPlacements,
  addPlacement,
  updatePlacement,
  deletePlacement,
} from "../api/api";
import { CheckSquare, Pencil, Trash2, Plus } from "lucide-react";

export default function Placements({ showToast }) {
  const [placements, setPlacements] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    candidateName: "",
    candidateId: "",
    roleTitle: "",
    department: "",
    startDate: "",
    salary: "",
    status: "active",
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchPlacements = await getPlacements();
      setPlacements(fetchPlacements.data);
    };
    fetchData();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({
      candidateName: "",
      candidateId: "",
      roleTitle: "",
      department: "",
      startDate: "",
      salary: "",
      status: "active",
    });
    setModal(true);
  };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ ...p });
    setModal(true);
  };

  const handleSubmit = async () => {
    if (!form.candidateName || !form.roleTitle || !form.startDate) {
      alert("Candidate name, role, and start date are required.");
      return;
    }
    if (editing) {
      await updatePlacement(editing.id, form);
      showToast("Placement updated");
    } else {
      await addPlacement(form);
      showToast("Placement recorded!");
    }
    setModal(false);
    // update the data
    const updatedData = await getPlacements();
    setPlacements(updatedData.data);
  };

  const handleDelete = async (id) => {
    await deletePlacement(id);
    showToast("Placement removed");
    // update the data
    const updatedData = await getPlacements();
    setPlacements(updatedData.data);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Placements</h1>
          <p>Track successful candidate placements</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Record Placement
        </button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Role</th>
                <th>Department</th>
                <th>Start Date</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {placements.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">
                      <p>
                        No placements yet. Record one when a candidate is hired.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {placements.map((plcemnt) => (
                <tr key={plcemnt?.id}>
                  <td style={{ fontWeight: 600 }}>{plcemnt?.candidateName}</td>
                  <td>{plcemnt?.roleTitle}</td>
                  <td style={{ color: "var(--text-secondary)" }}>
                    {plcemnt?.department}
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>
                    {plcemnt?.startDate}
                  </td>
                  <td style={{ color: "#10b981", fontWeight: 600 }}>
                    {plcemnt?.salary || "—"}
                  </td>
                  <td>
                    <span className={`badge badge-${plcemnt?.status}`}>
                      {plcemnt?.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => openEdit(plcemnt)}
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(plcemnt?.id)}
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
              <h2>{editing ? "Edit Placement" : "Record New Placement"}</h2>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Candidate Name *</label>
                <input
                  value={form.candidateName}
                  onChange={(e) =>
                    setForm({ ...form, candidateName: e.target.value })
                  }
                  placeholder="Full name"
                />
              </div>
              <div className="form-group">
                <label>Role Title *</label>
                <input
                  value={form.roleTitle}
                  onChange={(e) =>
                    setForm({ ...form, roleTitle: e.target.value })
                  }
                  placeholder="e.g. Software Engineer"
                />
              </div>
            </div>
            <div className="form-row">
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
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Salary</label>
                <input
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  placeholder="e.g. €60,000"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                {editing ? "Save Changes" : "Record Placement"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
