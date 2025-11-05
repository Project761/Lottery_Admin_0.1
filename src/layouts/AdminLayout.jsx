import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BiHome, BiBuildingHouse, BiUser, BiFolder, BiMap, BiLogOut } from "react-icons/bi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { path: "/", icon: <BiHome />, label: "Dashboard" },
    { path: "/bank", icon: <BiBuildingHouse />, label: "Bank" },
    { path: "/caste", icon: <BiUser />, label: "Caste" },
    { path: "/project", icon: <BiFolder />, label: "Project" },
    { path: "/plot", icon: <BiMap />, label: "Plot" },
    { path: "/application", icon: <BiFolder />, label: "Application" },
    { path: "/bank-details", icon: <BiBuildingHouse />, label: "Bank Details" },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div 
        className={`bg-dark text-white p-3 vh-100 ${sidebarOpen ? 'd-block' : 'd-none d-lg-block'}`} 
        style={{ width: "250px", position: "fixed" }}
      >
        <h5 className="fw-bold mb-0">🏠 RIYASAT VATIKA</h5>
        <p className="text-secondary small">PHASE - 1</p>
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item mb-2">
              <Link
                to={item.path}
                className={`nav-link text-white d-flex align-items-center gap-2 ${
                  location.pathname === item.path ? "active bg-primary rounded-2 px-2" : ""
                }`}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-3 border-top">
          <Link to="/logout" className="nav-link text-white d-flex align-items-center gap-2">
            <BiLogOut /> Logout
          </Link>
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
        className="flex-grow-1 d-flex flex-column min-vh-100"
        style={{ marginLeft: sidebarOpen ? "250px" : "0", transition: 'margin-left 0.3s' }}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        
        {/* Page Content */}
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
