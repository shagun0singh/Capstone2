import React, { useState, useEffect, useRef } from 'react';
import './Reminder.css';

const Reminder = () => {
  const [interval, setInterval] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // in seconds
  const timerRef = useRef(null);

  // Format time left as 'X min Y secs'
  const formatTimeLeft = (seconds) => {
    if (!seconds || seconds <= 0) return '0 min 00 secs';
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} min ${sec < 10 ? '0' : ''}${sec} secs`;
  };

  // Handle interval change
  const handleIntervalChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setInterval(value);
      setTimeLeft(value * 60);
    }
  };

  // Handle start reminders
  const handleStartReminders = () => {
    setIsActive(true);
    setTimeLeft(interval * 60);
  };

  // Handle stop reminders
  const handleStopReminders = () => {
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeLeft(interval * 60);
  };

  // Countdown timer effect
  useEffect(() => {
    if (isActive) {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Start new timer
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            return interval * 60; // Reset to full interval
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      // Clear timer when not active
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, interval]); // Removed timeLeft from dependencies

  // Notification timer
  useEffect(() => {
    let notificationTimer;
    if (isActive) {
      notificationTimer = setInterval(() => {
        if ("Notification" in window) {
          if (Notification.permission === "granted") {
            new Notification("Time to Hydrate!", {
              body: "Don't forget to drink water! 💧",
              icon: "/water-drop.png"
            });
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission();
          }
        }
      }, interval * 60 * 1000);
    }
    return () => clearInterval(notificationTimer);
  }, [isActive, interval]);

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
                value={interval}
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
              Reminders active every {interval} minutes<br />
              Next reminder in {formatTimeLeft(timeLeft)}
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