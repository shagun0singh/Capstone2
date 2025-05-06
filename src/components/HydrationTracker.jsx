import React, { useState, useEffect } from 'react';
import { getHydrationData, updateWaterIntake, resetDailyIntake } from '../utils/hydrationData';
import HydrationReminder from './HydrationReminder';
import './HydrationTracker.css';

const HydrationTracker = () => {
  const [hydrationData, setHydrationData] = useState({
    waterIntake: 0,
    goal: 2000,
    history: []
  });

  useEffect(() => {
    const data = getHydrationData();
    setHydrationData({
      waterIntake: data.todayIntake,
      goal: data.goal,
      history: data.history
    });

    const interval = setInterval(() => {
      const updatedData = getHydrationData();
      setHydrationData(prev => ({
        ...prev,
        waterIntake: updatedData.todayIntake,
        goal: updatedData.goal,
        history: updatedData.history
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addWater = (amount) => {
    const { newIntake, history } = updateWaterIntake(amount);
    setHydrationData(prev => ({
      ...prev,
      waterIntake: newIntake,
      history: history
    }));
  };

  const resetIntake = () => {
    const { newIntake, history } = resetDailyIntake();
    setHydrationData(prev => ({
      ...prev,
      waterIntake: newIntake,
      history: history
    }));
  };

  const calculateProgress = () => {
    return Math.min((hydrationData.waterIntake / hydrationData.goal) * 100, 100);
  };

  return (
    <div className="hydration-tracker">
      <div className="tracker-header">
        <h1>Hydration Tracker</h1>
        <p>Track your daily water intake</p>
      </div>

      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        <div className="progress-text">
          <span>{hydrationData.waterIntake}ml</span>
          <span>Goal: {hydrationData.goal}ml</span>
        </div>
      </div>

      <div className="quick-add">
        <h2>Quick Add</h2>
        <div className="add-buttons">
          <button onClick={() => addWater(250)}>250ml</button>
          <button onClick={() => addWater(500)}>500ml</button>
          <button onClick={() => addWater(750)}>750ml</button>
          <button onClick={() => addWater(1000)}>1000ml</button>
        </div>
      </div>

      <div className="history-section">
        <h2>Today's History</h2>
        <div className="history-list">
          {hydrationData.history.length > 0 ? (
            hydrationData.history.map((entry, index) => (
              <div key={index} className="history-item">
                <span className="amount">+{entry.amount}ml</span>
                <span className="time">{entry.time}</span>
              </div>
            ))
          ) : (
            <p className="no-history">No entries yet today</p>
          )}
        </div>
        <button onClick={resetIntake} className="reset-btn">Reset Today's Intake</button>
      </div>

      <HydrationReminder />
    </div>
  );
};

export default HydrationTracker; 