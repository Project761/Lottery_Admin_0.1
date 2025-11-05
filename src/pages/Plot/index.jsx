import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import DataTable from "../../components/DataTable";

const Plot = () => {
  const [plots, setPlots] = useState([
    {
      id: 1,
      projectName: "Riyasat Vatika Phase-1",
      plotNo: "A-101",
      projectType: "Residential",
      plotSrNo: "PVT-001",
      plotSize: "1000 sq.ft",
      plotArea: "30x40",
      status: "Available"
    },
    {
      id: 2,
      projectName: "Green Valley Enclave",
      plotNo: "B-205",
      projectType: "Commercial",
      plotSrNo: "GVE-205",
      plotSize: "2000 sq.ft",
      plotArea: "40x50",
      status: "Booked"
    }
  ]);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    plotNo: "",
    projectType: "",
    plotSrNo: "",
    plotSize: "",
    plotArea: "",
    status: "Available"
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
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
      setPlots(plots.map(plot => 
        plot.id === formData.id ? { ...formData } : plot
      ));
    } else {
      const newPlot = {
        ...formData,
        id: plots.length > 0 ? Math.max(...plots.map(p => p.id)) + 1 : 1
      };
      setPlots([...plots, newPlot]);
    }
    setShowModal(false);
    setFormData({
      projectName: "",
      plotNo: "",
      projectType: "",
      plotSrNo: "",
      plotSize: "",
      plotArea: "",
      status: "Available"
    });
  };

  const handleEdit = (plot) => {
    setFormData(plot);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plot?")) {
      setPlots(plots.filter((p) => p.id !== id));
    }
  };

  const filteredPlots = plots.filter(plot => 
    Object.values(plot).some(
      value => value && 
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns = [
    {
      key: "projectName",
      label: "Project Name",
      sortable: true,
    },
    {
      key: "plotNo",
      label: "Plot No",
      sortable: true,
    },
    {
      key: "projectType",
      label: "Project Type",
      sortable: true,
    },
    {
      key: "plotSrNo",
      label: "Plot Sr. No",
      sortable: true,
    },
    {
      key: "plotSize",
      label: "Plot Size",
      sortable: true,
    },
    {
      key: "plotArea",
      label: "Plot Area",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item) => (
        <span className={`badge ${item.status === 'Available' ? 'bg-success' : 'bg-warning'}`}>
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
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
    <div className="container-fluid px-2 py-3">
      <div className="card shadow-sm border-0">
        <div className="card-body px-2 py-4">
          <DataTable
            title="Plot Management"
            icon="🏠"
            columns={columns}
            data={filteredPlots}
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
                  projectName: "",
                  plotNo: "",
                  projectType: "",
                  plotSrNo: "",
                  plotSize: "",
                  plotArea: "",
                  status: "Available"
                });
                setShowModal(true);
              }}
              className="mb-3"
            >
              <FaPlus className="me-1" /> Add Plot
            </Button>
          </DataTable>

          {/* Add/Edit Plot Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formData.id ? 'Edit Plot' : 'Add New Plot'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Plot No</Form.Label>
              <Form.Control
                type="text"
                name="plotNo"
                value={formData.plotNo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Type</Form.Label>
              <Form.Select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Plot Sr. No</Form.Label>
              <Form.Control
                type="text"
                name="plotSrNo"
                value={formData.plotSrNo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Plot Size (sq.ft)</Form.Label>
              <Form.Control
                type="text"
                name="plotSize"
                value={formData.plotSize}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Plot Area</Form.Label>
              <Form.Control
                type="text"
                name="plotArea"
                value={formData.plotArea}
                onChange={handleInputChange}
                placeholder="e.g., 30x40"
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Sold">Sold</option>
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
        </div>
      </div>
    </div>
  );
};

export default Plot;
