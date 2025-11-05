import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Bank from "./pages/Bank";
import Caste from "./pages/Caste";
import Project from "./pages/Project";
import Plot from "./pages/Plot";
import Application from "./pages/Application";
import BankDetails from "./pages/BankDetails";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/caste" element={<Caste />} />
        <Route path="/project" element={<Project />} />
        <Route path="/plot" element={<Plot />} />
        <Route path="/application" element={<Application />} />
        <Route path="/bank-details" element={<BankDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
