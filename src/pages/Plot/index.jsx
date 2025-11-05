import React, { useState } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import DataTable from "../../components/DataTable";

const Plot = () => {
  const [plots, setPlots] = useState([
    {
      id: 1,
      projectName: "Riyasat Vatika Phase-1",
      plotNo: "A-101",
      projectType: "Residential",
      plotSize: "1000 sq.ft",
      plotArea: "Yard",
    },
    {
      id: 2,
      projectName: "Green Valley Enclave",
      plotNo: "B-205",
      projectType: "Commercial",
      plotSize: "2000 sq.ft",
      plotArea: "Meter",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    plotNo: "",
    plotSize: "",
    plotArea: "",
  });

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.projectName &&
      formData.projectType &&
      formData.plotNo &&
      formData.plotSize &&
      formData.plotArea
    ) {
      const newPlot = {
        id: plots.length ? Math.max(...plots.map((p) => p.id)) + 1 : 1,
        ...formData,
      };
      setPlots([...plots, newPlot]);
      setFormData({
        projectName: "",
        projectType: "",
        plotNo: "",
        plotSize: "",
        plotArea: "",
      });
      setShowForm(false);
    } else {
      alert("Please fill all fields!");
    }
  };

  // ✅ Delete plot
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plot?")) {
      setPlots((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // ✅ DataTable columns
  const columns = [
    { text: "Project Name", dataField: "projectName" },
    { text: "Project Type", dataField: "projectType" },
    { text: "Plot Number", dataField: "plotNo" },
    { text: "Plot Size", dataField: "plotSize" },
    { text: "Plot Area", dataField: "plotArea" },
  ];

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          {/* ✅ Conditional View: DataTable or Form */}
          {!showForm ? (
            <DataTable
              columns={columns}
              data={plots}
              onDelete={(row) => handleDelete(row.id)}
              showAddButton={true}
              addButtonText="Add Plot"
              onAddClick={() => setShowForm(true)}
            />
          ) : (
            <Card className="p-4 border-0 shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 fw-bold">Add New Plot</h5>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setShowForm(false)}
                >
                  ← Back
                </Button>
              </div>

              <Form onSubmit={handleSubmit}>
                <Row className="g-3 align-items-end">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Project Name</Form.Label>
                      <Form.Select
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">--SELECT PROJECT NAME--</option>
                        <option>Riyasat Vatika Phase-1</option>
                        <option>Green Valley Enclave</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Project Type</Form.Label>
                      <Form.Select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">--SELECT PROJECT TYPE--</option>
                        <option>Residential</option>
                        <option>Commercial</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Plot Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="plotNo"
                        placeholder="Enter Plot Number"
                        value={formData.plotNo}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Plot Size</Form.Label>
                      <Form.Control
                        type="text"
                        name="plotSize"
                        placeholder="Enter Plot Size"
                        value={formData.plotSize}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mt-3">
                    <Form.Group>
                      <div className="d-flex align-items-center flex-wrap gap-4">
                        {["Plot Area", "Yard", "Meter"].map((area) => (
                          <Form.Check
                            key={area}
                            inline
                            label={area}
                            name="plotArea"
                            type="radio"
                            value={area}
                            checked={formData.plotArea === area}
                            onChange={handleInputChange}
                            className="mb-0"
                          />
                        ))}
                      </div>
                    </Form.Group>
                  </Col>


                  <Col md={12} className="text-end mt-3">
                    <Button type="submit" variant="primary" className="px-4">
                      Add Plot
                    </Button>
                    <Button
                      variant="secondary"
                      className="ms-2"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plot;
