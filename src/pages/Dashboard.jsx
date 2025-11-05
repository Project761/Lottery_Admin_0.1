import React from "react";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <StatCard title="Total Application" value="1,254" icon="user" color="primary" />
        <StatCard title="Success Application" value="24" icon="check" color="success" />
        <StatCard title="Success Application EWS" value="$12,540" icon="money" color="warning" />
        <StatCard title="Success Application LIG" value="156" icon="clock" color="danger" />
      </div>
    </div>
  );
};

export default Dashboard;
