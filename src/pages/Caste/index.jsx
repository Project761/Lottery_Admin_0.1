import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import DataTable from "../../components/DataTable";
import AddEditModal from "../../components/AddEditModal";

const Caste = () => {
  const { setTotalEntries } = useOutletContext();

  const defaultCastes = [
    { id: 1, name: "ST" },
    { id: 2, name: "SC" },
    { id: 3, name: "OBC" },
    { id: 4, name: "GENERAL" },
  ];

  const [castes, setCastes] = useState(defaultCastes);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  // ✅ Update Navbar count dynamically
  const filtered = castes.filter((caste) =>
    caste.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setTotalEntries(filtered.length);
  }, [filtered.length, setTotalEntries]);

  // ✅ Handle sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // ✅ Add new caste
  const handleAddCaste = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      const newId = Math.max(...castes.map((c) => c.id), 0) + 1;
      setCastes([...castes, { id: newId, name: formData.name.trim() }]);
      setFormData({ name: "" });
      setShowAddModal(false);
    }
  };

  // ✅ Delete caste
  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      setCastes(castes.filter((c) => c.id !== row.id));
    }
  };

  const columns = [
    { key: "name", label: "Caste Name", sortable: true },
  ];

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <DataTable
            columns={columns}
            data={filtered}
            onAddClick={() => setShowAddModal(true)} // ✅ Opens modal
            onDelete={handleDelete}
            showAddButton={true}
            addButtonText="Add Caste"
          />
        </div>
      </div>

      {/* ✅ Add/Edit Modal */}
      <AddEditModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        title="Add New Caste"
        formFields={[
          {
            name: "name",
            label: "Caste Name",
            placeholder: "Enter caste name",
            autoFocus: true,
            required: true,
          },
        ]}
        formData={formData}
        onInputChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        onSubmit={handleAddCaste}
        submitButtonText="Add Caste"
      />
    </div>
  );
};

export default Caste;
