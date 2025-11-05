import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaPlus, FaBuilding } from "react-icons/fa";
import DataTable from "../../components/DataTable";
import AddEditModal from "../../components/AddEditModal";

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
    { key: "name", label: "Project Name", sortable: true },
    { key: "location", label: "Location", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item) => (
        <span
          className={`badge ${item.status === "Active" ? "bg-success" : "bg-secondary"
            }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">


          <DataTable
            title="Project List"
            columns={columns}
            data={filtered}
            onDelete={handleDelete}
            search={search}
            setSearch={setSearch}
            entries={entries}
            setEntries={setEntries}
            page={page}
            setPage={setPage}
            sortConfig={sortConfig}
            onSort={handleSort}
            showAddButton={true}
            addButtonText="Add Project"
            onAddClick={() => setShowAddModal(true)}
          />
        </div>
      </div>

      <AddEditModal show={showAddModal} onHide={() => setShowAddModal(false)} title="Add New Project" formFields={[
        {
          name: 'name',
          label: 'Project Name',
          placeholder: 'Enter project name',
          autoFocus: true,
          required: true,
        },
       
      ]} formData={newProject} onInputChange={(e) => setNewProject({ ...newProject, [e.target.name]: e.target.value })} onSubmit={handleAddProject} />

    </div>
  );
};

export default Project;
