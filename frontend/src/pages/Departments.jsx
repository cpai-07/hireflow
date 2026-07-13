import { useEffect, useState, useCallback } from "react";
import {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../api/api";
import { Building2, Pencil, Trash2, Plus } from "lucide-react";

export default function Departments({ showToast }) {
  const [departments, setDepartments] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    manager: "",
    location: "",
    headcount: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchDepartments = await getDepartments();
      setDepartments(fetchDepartments.data);
    };
    fetchData();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", manager: "", location: "", headcount: "" });
    setModal(true);
  };
  const openEdit = (department) => {
    setEditing(department);
    setForm({ ...department });
    setModal(true);
  };

  const handleSubmit = async () => {
    if (!form.name) {
      alert("Department name is required.");
      return;
    }
    if (editing) {
      await updateDepartment(editing.id, form);
      showToast("Department updated");
    } else {
      await addDepartment(form);
      showToast("Department added");
    }
    setModal(false);
    // update the data
    const updatedData = await getDepartments();
    setDepartments(updatedData.data);
  };

  // delete function
  const handleDelete = async (id, name) => {
    await deleteDepartment(id);
    showToast("Department deleted");
    // update the data
    const updatedData = await getDepartments();
    setDepartments(updatedData.data);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Departments</h1>
          <p>Manage your organisation's departments</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Department
        </button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Department</th>
                <th>Manager</th>
                <th>Location</th>
                <th>Headcount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <div className="empty-state">
                      <p>No departments yet.</p>
                    </div>
                  </td>
                </tr>
              )}
              {departments.map((department) => (
                <tr key={department?.id}>
                  <td
                    style={{
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Building2 size={15} color="" /> {department?.name}
                  </td>
                  <td style={{ color: "" }}>{department?.manager || "—"}</td>
                  <td style={{ color: "" }}>{department?.location || "—"}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: "" }}>
                      {department?.headcount}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => openEdit(department)}
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(department?.id, department?.name)
                        }
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
              <h2>{editing ? "Edit Department" : "Add Department"}</h2>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setModal(false)}
              >
                x
              </button>
            </div>
            <div className="form-group">
              <label>Department Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Engineering"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Manager</label>
                <input
                  value={form.manager}
                  onChange={(e) =>
                    setForm({ ...form, manager: e.target.value })
                  }
                  placeholder="Manager name"
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="e.g. Dublin"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Headcount</label>
              <input
                type="number"
                value={form.headcount}
                onChange={(e) =>
                  setForm({ ...form, headcount: e.target.value })
                }
                placeholder="0"
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                {editing ? "Save Changes" : "Add Department"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
