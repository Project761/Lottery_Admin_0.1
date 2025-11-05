import React, { useState } from "react";
import { Navbar, Button } from "react-bootstrap";
import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const NavbarComponent = ({ toggleSidebar, currentPage, totalEntries, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Navbar bg="white" className="shadow-sm px-4 py-2 d-flex align-items-center" style={{
      position: "sticky",
      top: 0,
      zIndex: 1030,
    }}>
      {/* Sidebar toggle (for mobile) */}
      <Button
        variant="link"
        className="text-dark d-lg-none me-2"
        onClick={toggleSidebar}
      >
        <FaBars />
      </Button>

      {/* Page Title with conditional total entries */}
      <div className="flex-grow-1 d-flex align-items-center">
        <span className="fw-bold text-capitalize fs-5 me-2">
          {currentPage}
        </span>

        {/* Show total entries only on specific pages */}
        {totalEntries !== undefined &&
          currentPage.toLowerCase() !== 'dashboard' &&
          currentPage.toLowerCase() !== 'application' &&
          currentPage.toLowerCase() !== 'bankdetails' && (
            <span className="text-muted small">
              – Total {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}:{" "}
              <strong>{totalEntries}</strong>
            </span>
          )}
      </div>

      {/* Right-side user dropdown */}
      <div className="d-flex align-items-center ms-auto">
        <div className="dropdown">
          <Button
            variant="link"
            className="text-dark text-decoration-none dropdown-toggle d-flex align-items-center"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaUserCircle className="fs-3 me-2" />
          </Button>

          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="userDropdown"
          >
            <li>
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/settings">
                Settings
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item d-flex align-items-center"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm('Are you sure you want to logout?')) {
                    onLogout();
                  }
                }}
              >
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
