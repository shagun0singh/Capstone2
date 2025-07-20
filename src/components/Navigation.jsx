import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="main-nav">
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
        >
          Dashboard
        </Link>
        <Link 
          to="/today" 
          className={`nav-link ${isActive('/today') ? 'active' : ''}`}
        >
          Today's Progress
        </Link>
        <Link 
          to="/reminder" 
          className={`nav-link ${isActive('/reminder') ? 'active' : ''}`}
        >
          Reminder
        </Link>
        <Link 
          to="/hydration" 
          className={`nav-link ${isActive('/hydration') ? 'active' : ''}`}
        >
          Add Intake
        </Link>
        <Link 
          to="/profile" 
          className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navigation; 