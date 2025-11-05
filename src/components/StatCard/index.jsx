import React from 'react';
import { Card } from 'react-bootstrap';
import { 
  FaUsers, 
  FaCheckCircle, 
  FaMoneyBillWave, 
  FaClock 
} from 'react-icons/fa';

const StatCard = ({ title, value, icon, color }) => {
  const getIcon = () => {
    switch(icon) {
      case 'user': return <FaUsers className="fs-1" />;
      case 'check': return <FaCheckCircle className="fs-1" />;
      case 'money': return <FaMoneyBillWave className="fs-1" />;
      case 'clock': return <FaClock className="fs-1" />;
      default: return null;
    }
  };

  return (
    <div className="col-md-3 col-sm-6">
      <Card className={`mb-4 bg-${color} text-white`}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-0">{title}</h6>
              <h2 className="mb-0 fw-bold">{value}</h2>
            </div>
            <div className="text-white-50">
              {getIcon()}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StatCard;
