import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHydrationData } from '../utils/hydrationData';
import './TodayProgress.css';

const TodayProgress = () => {
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
    <div className="today-progress-container">
      <div className="progress-header">
        <h1>Today's Progress</h1>
        <p>Track your daily hydration goals</p>
      </div>
      
      <div className="progress-content">
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
    </div>
  );
};

export default TodayProgress; 