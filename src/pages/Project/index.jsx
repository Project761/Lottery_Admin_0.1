import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import DataTable from "../../components/DataTable";

const Project = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Riyasat Vatika Phase-1", location: "City 1", status: "Active" },
    { id: 2, name: "Green Valley Enclave", location: "City 2", status: "Inactive" },
  ]);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    location: "",
    status: "Active",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filtered = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.location.toLowerCase().includes(search.toLowerCase()) ||
      project.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProject.name && newProject.location) {
      setProjects([
        ...projects,
        { ...newProject, id: projects.length + 1 },
      ]);
      setNewProject({ name: "", location: "", status: "Active" });
      setShowAddModal(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Project Name",
      sortable: true,
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item) => (
        <span className={`badge ${item.status === "Active" ? "bg-success" : "bg-secondary"}`}>
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">
              <span className="me-2">🏗️</span>Project Management
            </h4>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddModal(true)}
            >
              <FaPlus className="me-1" /> Add Project
            </Button>
          </div>
          
          <DataTable
            title="Project List"
            columns={columns}
            data={filtered}
            search={search}
            setSearch={setSearch}
            entries={entries}
            setEntries={setEntries}
            page={page}
            setPage={setPage}
            sortConfig={sortConfig}
            onSort={handleSort}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Add Project Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleAddProject}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={newProject.location}
                onChange={(e) =>
                  setNewProject({ ...newProject, location: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newProject.status}
                onChange={(e) =>
                  setNewProject({ ...newProject, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Project;
