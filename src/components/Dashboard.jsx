import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome Back!</h1>
        <p>Let's stay hydrated today</p>
      </div>
      
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/today" className="action-btn">
            <span className="action-icon">📊</span>
            <span className="action-text">Today's Progress</span>
          </Link>
          <Link to="/reminder" className="action-btn">
            <span className="action-icon">⏰</span>
            <span className="action-text">Reminder</span>
          </Link>
          <Link to="/hydration" className="action-btn">
            <span className="action-icon">💧</span>
            <span className="action-text">Add Intake</span>
          </Link>
          <Link to="/profile" className="action-btn">
            <span className="action-icon">👤</span>
            <span className="action-text">View Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;