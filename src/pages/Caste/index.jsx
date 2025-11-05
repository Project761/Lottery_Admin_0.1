import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import DataTable from "../../components/DataTable";

const Caste = () => {
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

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filtered = castes.filter((caste) =>
    caste.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this caste?`)) {
      setCastes(castes.filter((c) => c.id !== id));
    }
  };

  const columns = [
    {
      key: "name",
      label: "Caste Name",
      sortable: true,
    },
  ];

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="fw-bold mb-3">
            <span className="me-2">🏷️</span>Caste Management
          </h4>
        </div>
      </div>
      
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <DataTable
            title="Caste List"
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
          >
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                // Add new caste logic here
                alert('Add new caste functionality will go here');
              }}
              className="mb-3"
            >
              <FaPlus className="me-1" /> Add Caste
            </Button>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Caste;
