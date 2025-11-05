import React, { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";

const Application = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    // Mock API fetch simulation
    setTimeout(() => {
      setData([
        {
          id: 1,
          ApplicantNumber: "APP-001",
          FullName: "Rahul Mehta",
          Mobile: "9876543210",
          AadharNumber: "1234-5678-9101",
          Email: "rahul@example.com",
          City: "Jaipur",
          PaymentAttachement: "https://example.com/receipt1.pdf",
        },
        {
          id: 2,
          ApplicantNumber: "APP-002",
          FullName: "Priya Sharma",
          Mobile: "9988776655",
          AadharNumber: "2222-3333-4444",
          Email: "priya@example.com",
          City: "Delhi",
          PaymentAttachement: "https://example.com/receipt2.pdf",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    { key: "ApplicantNumber", label: "Applicant Number", sortable: true },
    { key: "FullName", label: "Full Name", sortable: true },
    { key: "Mobile", label: "Mobile Number", sortable: true },
    { key: "AadharNumber", label: "Aadhar Number", sortable: true },
    { key: "Email", label: "Email ID", sortable: true },
    { key: "City", label: "Address", sortable: true },
    {
      key: "PaymentAttachement",
      label: "Attachment",
      render: (row) =>
        row.PaymentAttachement ? (
          <a
            href={row.PaymentAttachement}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        ) : (
          "—"
        ),
    },
  ];

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="page-wrapper">
            {loading ? (
              <p className="text-center my-5">Loading data...</p>
            ) : (
              <DataTable
                // title="Application Management"
                // icon="👥"
                columns={columns}
                data={filteredData}
                search={search}
                setSearch={setSearch}
                entries={entries}
                setEntries={setEntries}
                page={page}
                setPage={setPage}
                sortConfig={sortConfig}
                onSort={handleSort}
                showAddButton={false}
              />
            )}
          </div>
        </div>
      </div>
    </>

  );
};

export default Application;
