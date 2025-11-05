import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import DataTable from "../../components/DataTable";

const Bank = () => {
  const allBanks = [
    "Andhra Bank",
    "Allahabad Bank",
    "BANK OF BARODA",
    "Bank of India",
    "BANK OF MAHARASHTRA",
    "Bandhan Bank Ltd.",
    "Bank of Rajsthan",
    "Central Bank of India",
    "CORPORATION BANK",
    "Dena Bank",
    "Punjab National Bank",
    "ICICI Bank",
    "HDFC Bank",
    "Axis Bank",
    "Canara Bank",
    "Union Bank of India",
    "Indian Bank",
    "Indian Overseas Bank",
    "Yes Bank",
    "Kotak Mahindra Bank",
    "UCO Bank",
    "IDBI Bank",
    "Federal Bank",
    "South Indian Bank",
    "IndusInd Bank",
    "City Union Bank",
    "Karur Vysya Bank",
    "Bank of Rajasthan",
    "Bandhan Bank",
  ];

  const [banks, setBanks] = useState(allBanks);
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

  const filtered = banks.filter((bank) =>
    bank.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (bankName) => {
    if (window.confirm(`Are you sure you want to delete "${bankName}"?`)) {
      setBanks((prev) => prev.filter((b) => b !== bankName));
    }
  };

  const columns = [{ key: "name", label: "Bank Name", sortable: true }];

  const tableData = filtered.map((bank, i) => ({
    id: i + 1,
    name: bank,
  }));

  return (
    <div className="w-100" style={{ backgroundColor: "#f8f9fa", minHeight: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h4 className="fw-bold mb-0">
          <span className="me-2">🏦</span> Bank Management
        </h4>

        <Button
          variant="primary"
          size="sm"
          className="d-flex align-items-center"
          onClick={() => alert("Add new bank functionality will go here")}
        >
          <FaPlus className="me-2" /> Add Bank
        </Button>
      </div>

      {/* Full-width DataTable wrapper */}
      <div className="bg-white p-3 shadow-sm rounded-3" style={{ width: '100%', margin: '0 -15px' }}>
        <DataTable
          title="Bank List"
          columns={columns}
          data={tableData}
          entries={entries}
          page={page}
          setPage={setPage}
          sortConfig={sortConfig}
          onSort={handleSort}
          onDelete={handleDelete}
          search={search}
          setSearch={setSearch}
        />
      </div>
    </div>
  );
};

export default Bank;
