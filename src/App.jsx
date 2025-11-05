import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Bank from "./pages/Bank";
import Caste from "./pages/Caste";
import Project from "./pages/Project";
import Plot from "./pages/Plot";
import Application from "./pages/Application";
import BankDetails from "./pages/BankDetails";
import Login from "./components/Login";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
      
      {/* Protected Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <AdminLayout onLogout={handleLogout} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="bank" element={<Bank />} />
        <Route path="caste" element={<Caste />} />
        <Route path="project" element={<Project />} />
        <Route path="plot" element={<Plot />} />
        <Route path="application" element={<Application />} />
        <Route path="bank-details" element={<BankDetails />} />
      </Route>

      {/* Redirect all other routes to login or dashboard based on auth status */}
      <Route 
        path="*" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} 
      />
    </Routes>
  );
}

export default App;
