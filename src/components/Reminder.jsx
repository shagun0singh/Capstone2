import React, { useState, useEffect, useRef } from 'react';
import './Reminder.css';

const Reminder = () => {
  const [intervalMinutes, setIntervalMinutes] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // in seconds
  const intervalIdRef = useRef(null);

  const formatTimeLeft = (seconds) => {
    if (!seconds || seconds <= 0) return '0 min 00 secs';
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} min ${sec < 10 ? '0' : ''}${sec} secs`;
  };


  const handleIntervalChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setIntervalMinutes(value);
      setTimeLeft(value * 60);
    }
  };

  const handleStartReminders = () => {
    setIsActive(true);
    setTimeLeft(intervalMinutes * 60);
  };

  const handleStopReminders = () => {
    setIsActive(false);
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setTimeLeft(intervalMinutes * 60);
  };

  useEffect(() => {
    if (isActive) {
      intervalIdRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Time to Hydrate!", {
                body: "Don't forget to drink water! 💧",
                icon: "/water-drop.png"
              });
            }
            return intervalMinutes * 60; 
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isActive, intervalMinutes]);

  
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="reminder-container">
      <div className="reminder-header">
        <h1>Hydration Reminders</h1>
        <p>Set and view your hydration reminders here.</p>
      </div>
      <div className="reminder-content">
        <div className="reminder-controls">
          <div className="interval-selector">
            <label>
              Reminder Interval (minutes):
              <input
                type="number"
                value={intervalMinutes}
                onChange={handleIntervalChange}
                min="15"
                max="180"
                disabled={isActive}
              />
            </label>
          </div>
          <div className="reminder-buttons">
            {!isActive ? (
              <button onClick={handleStartReminders} className="start-btn">
                Start Reminder
              </button>
            ) : (
              <button onClick={handleStopReminders} className="stop-btn">
                Stop Reminders
              </button>
            )}
          </div>
        </div>
        <div className="reminder-status">
          {isActive ? (
            <p className="active-status">
              Reminders active every {intervalMinutes} minutes<br />
              Next reminder in <strong>{formatTimeLeft(timeLeft)}</strong>
            </p>
          ) : (
            <p className="inactive-status">Reminders are currently inactive</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminder; 