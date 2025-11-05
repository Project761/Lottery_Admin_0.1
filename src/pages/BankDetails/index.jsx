import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import DataTable from '../../components/DataTable';

const BankDetails = () => {
  const [bankDetails, setBankDetails] = useState([
    {
      id: 1,
      bankName: "SBI",
      accountNumber: "123456789012",
      accountHolder: "John Doe",
      ifscCode: "SBIN0001234",
      branch: "Main Branch",
      status: "Active"
    },
    {
      id: 2,
      bankName: "HDFC",
      accountNumber: "987654321098",
      accountHolder: "Jane Smith",
      ifscCode: "HDFC0005678",
      branch: "City Center",
      status: "Inactive"
    }
  ]);

  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    ifscCode: '',
    branch: '',
    status: 'Active'
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setBankDetails(bankDetails.map(bank => 
        bank.id === formData.id ? { ...formData } : bank
      ));
    } else {
      const newBank = {
        ...formData,
        id: bankDetails.length > 0 ? Math.max(...bankDetails.map(b => b.id)) + 1 : 1
      };
      setBankDetails([...bankDetails, newBank]);
    }
    setShowModal(false);
    setFormData({
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      ifscCode: '',
      branch: '',
      status: 'Active'
    });
  };

  const handleEdit = (bank) => {
    setFormData(bank);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this bank detail?')) {
      setBankDetails(bankDetails.filter((b) => b.id !== id));
    }
  };

  const filteredBanks = bankDetails.filter(bank => 
    Object.values(bank).some(
      value => value && 
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns = [
    {
      key: 'bankName',
      label: 'Bank Name',
      sortable: true,
    },
    {
      key: 'accountNumber',
      label: 'Account Number',
      sortable: true,
    },
    {
      key: 'accountHolder',
      label: 'Account Holder',
      sortable: true,
    },
    {
      key: 'ifscCode',
      label: 'IFSC Code',
      sortable: true,
    },
    {
      key: 'branch',
      label: 'Branch',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item) => (
        <span className={`badge ${item.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
          {item.status}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="d-flex gap-1">
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(item);
            }}
          >
            <FaEdit />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item.id);
            }}
          >
            <FaTrash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Bank Details"
        icon="🏦"
        columns={columns}
        data={filteredBanks}
        search={search}
        setSearch={setSearch}
        entries={entries}
        setEntries={setEntries}
        page={page}
        setPage={setPage}
        sortConfig={sortConfig}
        onSort={handleSort}
      >
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setFormData({
              bankName: '',
              accountNumber: '',
              accountHolder: '',
              ifscCode: '',
              branch: '',
              status: 'Active'
            });
            setShowModal(true);
          }}
          className="mb-3"
        >
          <FaPlus className="me-1" /> Add Bank
        </Button>
      </DataTable>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formData.id ? 'Edit Bank Details' : 'Add New Bank Details'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account Holder Name</Form.Label>
              <Form.Control
                type="text"
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Branch</Form.Label>
              <Form.Control
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
            </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {formData.id ? 'Update' : 'Save'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default BankDetails;
