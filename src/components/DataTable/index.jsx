import React from 'react';
import { Table, Button, InputGroup, Form } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const DataTable = ({
  title,
  icon,
  columns = [],
  data = [],
  onAddClick,
  onEdit,
  onDelete,
  showSearch = true,
  showAddButton = true,
  addButtonText = 'Add New',
  ...props
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="data-table">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">
          {icon && <span className="me-2">{icon}</span>}
          {title}
        </h5>
        
        <div className="d-flex gap-2">
          {showSearch && (
            <InputGroup style={{ width: '250px' }}>
              <InputGroup.Text className="bg-white">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-start-0"
              />
            </InputGroup>
          )}
          
          {showAddButton && onAddClick && (
            <Button variant="primary" size="sm" onClick={onAddClick}>
              <FaPlus className="me-1" /> {addButtonText}
            </Button>
          )}
        </div>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover className="mb-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key || column.dataField}>
                  {column.text}
                </th>
              ))}
              {(onEdit || onDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {columns.map((column) => {
                  const cellValue = row[column.dataField];
                  return (
                    <td key={`${rowIndex}-${column.dataField}`}>
                      {column.formatter
                        ? column.formatter(cellValue, row, rowIndex)
                        : cellValue}
                    </td>
                  );
                })}
                {(onEdit || onDelete) && (
                  <td>
                    <div className="d-flex gap-2">
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
                          onClick={() => onDelete(row)}
                        >
                          <FaTrash />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
