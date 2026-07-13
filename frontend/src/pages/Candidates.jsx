import { useEffect, useState } from "react";
import {
  getCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} from "../api/api";
import { UserPlus, Pencil, Trash2, Search } from "lucide-react";

export default function Candidates({ showToast }) {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "applied",
    notes: "",
  });
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  // Fetch candidates data when site loads
  useEffect(() => {
    const getCandidatesData = async () => {
      try {
        const response = await getCandidates();
        setCandidates(response.data);
      } catch (error) {
        console.error("Error Candidates:", error);
      }
    };

    getCandidatesData();
  }, []);

  // Filter candidates : Search and dropdown filter search
  useEffect(() => {
    const filtered = candidates.filter((c) => {
      console.log("candidate:", c);
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.role.toLowerCase().includes(search.toLowerCase()) ||
        c.status.toLowerCase().includes(search.toLowerCase());

      console.log("filter", filter, c.status === filter);
      const matchFilter = filter === "all" || c.status === filter;
      console.log(matchFilter, "match filter");
      return matchSearch && matchFilter;
    });
    setFilteredCandidates(filtered);
  }, [candidates, search, filter]);

  // add modal
  const openAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      email: "",
      role: "",
      department: "",
      status: "applied",
      notes: "",
    });
    setModal(true);
  };

  console.log("modal chinmay", modal);

  // edit modal
  const openEdit = (candidate) => {
    setEditing(candidate);
    setForm({ ...candidate });
    setModal(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.role || !form.department) {
      showToast("Please fill the required fields");
      return;
    }

    if (editing) {
      // calling update API
      await updateCandidate(editing.id, form);
      showToast("Candidate updated successfully");
    } else {
      // calling add API if ADD candidate function calls
      await addCandidate(form);
      showToast("Candidate added successfully");
    }

    setModal(false);
    // calling this API to update the candidate list
    const updatedCandidateData = await getCandidates();
    setCandidates(updatedCandidateData.data);
  };

  // delete candidate
  const handleDelete = async (id) => {
    await deleteCandidate(id);
    showToast("Candidate removed");

    // calling this API to update the candidate list
    const updatedCandidateData = await getCandidates();
    setCandidates(updatedCandidateData.data);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Candidates</h1>
          <p>Manage and track all applicants in the pipeline</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <UserPlus size={16} /> Add Candidate
        </button>
      </div>

      <div className="card">
        <div className="toolbar">
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              size={15}
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "(--text-muted)",
              }}
            />
            <input
              className="search-input"
              style={{ paddingLeft: "2.2rem" }}
              placeholder="Search by name or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="interviewed">Interviewed</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">
                      <p>No candidates found. Add one to get started.</p>
                    </div>
                  </td>
                </tr>
              )}
              {filteredCandidates.map((candidate) => (
                <tr key={candidate?.id}>
                  <td style={{ fontWeight: 600 }}>{candidate?.name}</td>
                  <td style={{ color: "" }}>{candidate?.email}</td>
                  <td>{candidate?.role}</td>
                  <td style={{ color: "" }}>{candidate?.department}</td>
                  <td>
                    <span className={`badge badge-${candidate?.status}`}>
                      {candidate?.status}
                    </span>
                  </td>
                  <td
                    style={{
                      color: "",
                      fontSize: "0.82rem",
                    }}
                  >
                    {candidate?.notes || "—"}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => openEdit(candidate)}
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(candidate?.id, candidate?.name)
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

      {/* Add / Edit Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editing ? "Edit Candidate" : "Add New Candidate"}</h2>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setModal(false)}
              >
                x
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Liam Murphy"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                  type="email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Applying for Role *</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Software Engineer"
                />
              </div>
              <div className="form-group">
                <label>Department *</label>
                <input
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  placeholder="e.g. Engineering"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="applied">Applied</option>
                <option value="interviewed">Interviewed</option>
                <option value="hired">Hired </option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Any notes about this candidate..."
              />
            </div>

            <div className="form-actions">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                {editing ? "Save Changes" : "Add Candidate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
