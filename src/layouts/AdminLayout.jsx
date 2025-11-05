import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  BiHome,
  BiBuildingHouse,
  BiUser,
  BiFolder,
  BiMap,
  BiLogOut,
} from "react-icons/bi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminLayout = ({ onLogout }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { path: "/", icon: <BiHome />, label: "Dashboard" },
    { path: "/bank", icon: <BiBuildingHouse />, label: "Bank" },
    { path: "/caste", icon: <BiUser />, label: "Caste" },
    { path: "/project", icon: <BiFolder />, label: "Project" },
    { path: "/plot", icon: <BiMap />, label: "Plot" },
    { path: "/application", icon: <BiFolder />, label: "Application" },
    { path: "/bank-details", icon: <BiBuildingHouse />, label: "Bank Details" },
  ];

  // 🧠 Determine current page title from menuItems
  const currentTitle =
    menuItems.find((item) => item.path === location.pathname)?.label ||
    "Dashboard";

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`bg-dark text-white p-3 vh-100 ${
          sidebarOpen ? "d-block" : "d-none d-lg-block"
        }`}
        style={{
          width: "250px",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflowY: "auto",
          transition: "all 0.3s",
          zIndex: 1001,
        }}
      >
        <div className="d-flex flex-column h-100">
          <div className="mb-3">
            <h5 className="fw-bold mb-0">🏠 RIYASAT VATIKA</h5>
            <p className="text-secondary small mb-0">PHASE - 1</p>
          </div>

          <ul className="nav flex-column">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item mb-1">
                <Link
                  to={item.path}
                  className={`nav-link text-white d-flex align-items-center gap-2 ${
                    location.pathname === item.path
                      ? "active bg-primary rounded-2 px-2"
                      : ""
                  }`}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-3 border-top">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm('Are you sure you want to logout?')) {
                  onLogout();
                }
              }}
              className="nav-link text-white d-flex align-items-center gap-2 w-100 bg-transparent border-0"
            >
              <BiLogOut /> <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="position-fixed bg-dark bg-opacity-50 w-100 h-100"
          style={{ zIndex: 1000, top: 0, left: 0 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{
          marginLeft: isMobile ? "0" : "250px",
          transition: "all 0.3s",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        {/* 🔽 Pass the current page name to Navbar */}
        <Navbar 
          toggleSidebar={toggleSidebar} 
          currentPage={currentTitle} 
          totalEntries={totalEntries}
          onLogout={onLogout}
        />

        <main className="flex-grow-1" style={{ width: "100%" }}>
          <div className="page-wrapper">
            <Outlet context={{ setTotalEntries }} />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
