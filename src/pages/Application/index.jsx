import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import DataTable from '../../components/DataTable';

const Application = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    // Assuming you have a function to fetch data
    const fetchData = async () => {
      // Replace with your actual API call
      const response = await fetch('https://example.com/api/data');
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'ApplicantNumber',
      label: 'Applicant Number',
      sortable: true,
    },
    {
      key: 'FullName',
      label: 'Full Name',
      sortable: true,
    },
    {
      key: 'Mobile',
      label: 'Mobile Number',
      sortable: true,
    },
    {
      key: 'AadharNumber',
      label: 'Aadhar Number',
      sortable: true,
    },
    {
      key: 'Email',
      label: 'Email ID',
      sortable: true,
      },
    {
      key: 'City',
      label: 'Address',
      sortable: true,

    },
    {
      key: 'PaymentAttachement',
      label: 'Attachment',
      render: (item) => (
        <a
          href={item.PaymentAttachement}
          target="_blank"
          rel="noopener noreferrer"
        >
          Attachment
        </a>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Application Management"
        icon="👥"
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
      />
    </>
  );
};

export default Application;
