import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus, FaUniversity } from "react-icons/fa";
import DataTable from "../../components/DataTable";
import AddEditModal from "../../components/AddEditModal";

const Bank = () => {
  const allBanks = [
    "Andhra Bank", "Allahabad Bank", "BANK OF BARODA", "Bank of India",
    "BANK OF MAHARASHTRA", "Bandhan Bank Ltd.", "Bank of Rajsthan",
    "Central Bank of India", "CORPORATION BANK", "Dena Bank",
    "Punjab National Bank", "ICICI Bank", "HDFC Bank", "Axis Bank",
    "Canara Bank", "Union Bank of India", "Indian Bank",
    "Indian Overseas Bank", "Yes Bank", "Kotak Mahindra Bank",
    "UCO Bank", "IDBI Bank", "Federal Bank", "South Indian Bank",
    "IndusInd Bank", "City Union Bank", "Karur Vysya Bank",
    "Bank of Rajasthan", "Bandhan Bank"
  ];

  const [banks, setBanks] = useState(allBanks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const handleDelete = (bank) => {
    if (window.confirm(`Are you sure you want to delete "${bank.name}"?`)) {
      setBanks((prev) => prev.filter((b) => b !== bank.name));
    }
  };

  // Columns must use text + dataField for DataTable
  const columns = [
    { text: "S.No", dataField: "id" },
    { text: "Bank Name", dataField: "name" },
  ];

  const tableData = banks.map((bank, i) => ({
    id: i + 1,
    name: bank,
  }));

  return (
    <div className="card p-1">
      <div className="card-body p-1">
        <div className="page-wrapper">
          <DataTable
            // title="Bank Management"
            // icon={<FaUniversity />}
            columns={columns}
            data={tableData}
            onAddClick={() => setShowAddModal(true)}
            onDelete={handleDelete}
            showAddButton={true}
            addButtonText="Add Bank"
          />
        </div>
      </div>
      <AddEditModal show={showAddModal} onHide={() => setShowAddModal(false)} title="Add New Bank" formFields={[
        {
          name: 'name',
          label: 'Bank Name',
          placeholder: 'Enter bank name',
          autoFocus: true,
          required: true,
        },
      ]} formData={formData} onInputChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} onSubmit={(e) => {
        e.preventDefault();
        setBanks([...banks, { id: banks.length + 1, name: formData.name }]);
        setShowAddModal(false);
        setFormData({ name: '' });
      }} />
    </div>
  );
};

export default Bank;
