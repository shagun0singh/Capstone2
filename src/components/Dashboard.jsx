import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHydrationData } from '../utils/hydrationData';
import './Dashboard.css';

const Dashboard = () => {
  const [todayStats, setTodayStats] = useState({
    current: 0,
    goal: 2000
  });

  useEffect(() => {
    const data = getHydrationData();
    if (data) {
      setTodayStats({
        current: data.todayIntake || 0,
        goal: data.userData?.dailyGoal || 2000
      });
    }
  }, []);

  const progressPercentage = Math.round((todayStats.current / todayStats.goal) * 100);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome Back!</h1>
        <p>Let's stay hydrated today</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card progress-card">
          <h2>Today's Progress</h2>
          <div className="progress-circle">
            <div className="progress-value">
              {progressPercentage}%
            </div>
            <div className="progress-label">Complete</div>
          </div>
          <div className="progress-details">
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-value">{todayStats.current}ml</span>
                <span className="stat-label">Current</span>
              </div>
              <div className="stat">
                <span className="stat-value">{todayStats.goal}ml</span>
                <span className="stat-label">Goal</span>
              </div>
            </div>
          </div>
          <Link to="/hydration" className="track-btn">
            <span className="btn-icon">💧</span>
            Track Water Intake
          </Link>
        </div>

        <div className="dashboard-card quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/hydration" className="action-btn">
              <span className="action-icon">💧</span>
              <span className="action-text">Track Water</span>
            </Link>
            <Link to="/profile" className="action-btn">
              <span className="action-icon">👤</span>
              <span className="action-text">View Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 