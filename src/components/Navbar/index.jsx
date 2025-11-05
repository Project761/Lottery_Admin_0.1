import React, { useState } from 'react';
import { Navbar, Form, Button } from 'react-bootstrap';
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';

const NavbarComponent = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Navbar bg="white" className="shadow-sm px-4 py-2">
      <Button
        variant="link"
        className="text-dark d-lg-none"
        onClick={toggleSidebar}
      >
        <FaBars />
      </Button>
      
      <div className="d-flex align-items-center ms-auto">
        <Form className="d-none d-md-flex me-3">
          <Form.Control
            type="search"
            placeholder="Search..."
            className="rounded-pill"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>
        
        <Button variant="link" className="text-dark position-relative me-2">
          <FaBell className="fs-5" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </Button>
        
        <div className="dropdown">
          <Button
            variant="link"
            className="text-dark text-decoration-none dropdown-toggle d-flex align-items-center"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaUserCircle className="fs-3 me-2" />
            <span className="d-none d-md-inline">Admin</span>
          </Button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li><a className="dropdown-item" href="/profile">Profile</a></li>
            <li><a className="dropdown-item" href="/settings">Settings</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="/logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
