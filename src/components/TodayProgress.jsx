import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHydrationData } from '../utils/hydrationData';
import './TodayProgress.css';

const TodayProgress = () => {
  const [todayData, setTodayData] = useState({ total: 0, goal: 2000 });
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const loadTodayData = () => {
      const data = getHydrationData();
      const total = data.todayIntake;
      const goal = data.goal;
      const percent = Math.min((total / goal) * 100, 100);
      setTodayData({ total, goal });
      setPercentage(percent);
    };

    loadTodayData();
    // Reload data every minute
    const interval = setInterval(loadTodayData, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatAmount = (amount) => {
    return `${amount}ml`;
  };

  return (
    <div className="today-progress-container">
      <div className="progress-header">
        <h1>Today's Progress</h1>
        <p>Track your daily hydration goals</p>
      </div>
      
      <div className="progress-content">
        <div className="progress-circle">
          <div className="progress-value">{formatAmount(todayData.total)}</div>
          <div className="progress-label">of {formatAmount(todayData.goal)}</div>
        </div>
        
        <div className="progress-details">
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-value">{Math.round(percentage)}%</span>
              <span className="stat-label">Goal Progress</span>
            </div>
            <div className="stat">
              <span className="stat-value">{todayData.total > 0 ? Math.round(todayData.total / 250) : 0}</span>
              <span className="stat-label">Glasses (250ml)</span>
            </div>
            <div className="stat">
              <span className="stat-value">{Math.max(0, todayData.goal - todayData.total)}ml</span>
              <span className="stat-label">Remaining</span>
            </div>
          </div>
        </div>
        
        <Link to="/hydration" className="track-btn">
          <span className="btn-icon">💧</span>
          Track Water Intake
        </Link>
      </div>
    </div>
  );
};

export default TodayProgress; 