import React from "react";
import { Table, Button, InputGroup, Form } from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const DataTable = ({
  columns = [],
  data = [],
  onAddClick,
  onEdit,
  onDelete,
  showSearch = true,
  showAddButton = true,
  addButtonText = "",
  onDataChange, // Callback when data changes
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [entries, setEntries] = React.useState(10);
  const [page, setPage] = React.useState(1);

  // ✅ Filtered data by search
  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (val) =>
        val &&
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Notify parent component about data changes
  React.useEffect(() => {
    if (onDataChange) {
      onDataChange(filteredData.length);
    }
  }, [filteredData.length, onDataChange]);

  // ✅ Paginated data (based on entries)
  const startIndex = (page - 1) * entries;
  const endIndex = startIndex + entries;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / entries);

  return (
    <div className="w-100">
      {/* 🔹 Top Controls */}
      <div className="d-flex flex-wrap justify-content-between align-items-center p-3 pt-1 border-bottom">
        {/* Show entries dropdown */}
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <span className="me-2 text-muted small">Show</span>
          <Form.Select
            size="sm"
            style={{ width: "80px" }}
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Form.Select>
          <span className="ms-2 text-muted small">entries</span>
        </div>

        {/* Search + Add Button */}
        <div className="d-flex gap-2 align-items-center">
          {showSearch && (
            <InputGroup style={{ width: "250px" }}>
              <InputGroup.Text className="bg-white">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="border-start-0"
              />
            </InputGroup>
          )}
          {showAddButton && onAddClick && addButtonText && (
            <Button
              variant="primary"
              size="sm"
              onClick={onAddClick}
              className="ms-2"
            >
              <FaPlus className="me-1" /> {addButtonText}
            </Button>
          )}
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="table-responsive w-100">
        <Table striped bordered hover className="mb-0 align-middle w-100">
          <thead className="bg-light text-center">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.text || col.label}</th>
              ))}
              {(onEdit || onDelete) && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, i) => (
                <tr key={row.id || i}>
                  {columns.map((col, j) => {
                    const field = col.dataField || col.key;
                    return (
                      <td key={j} className="text-center">
                        {col.render
                          ? col.render(row)
                          : row[field] !== undefined
                          ? row[field]
                          : ""}
                      </td>
                    );
                  })}
                  {(onEdit || onDelete) && (
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        {onEdit && (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => onEdit(row)}
                          >
                            <FaEdit />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onDelete(row.id)}
                          >
                            <FaTrash />
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="text-center py-4"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* 🔹 Pagination Info + Controls */}
      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top bg-light small text-muted">
        <div>
          Showing {filteredData.length === 0 ? 0 : startIndex + 1}–
          {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
        </div>

        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </Button>
          <span className="align-self-center">
            Page {page} of {totalPages || 1}
          </span>
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
