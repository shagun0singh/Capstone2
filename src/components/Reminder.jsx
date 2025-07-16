import React, { useState, useEffect } from 'react';
import './Reminder.css';

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [interval, setInterval] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // in seconds

  // Always use a valid interval for display and logic
  const validInterval = Number(interval) > 0 ? Number(interval) : 60;

  // Set timeLeft only when reminders are started
  useEffect(() => {
    if (isActive) {
      setTimeLeft(validInterval * 60);
    }
  }, [isActive]);

  // Notification timer
  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
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
        setTimeLeft(validInterval * 60); // reset countdown after notification
      }, validInterval * 60 * 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, validInterval]);

  // Countdown timer
  useEffect(() => {
    let countdown;
    if (isActive) {
      countdown = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) return prev - 1;
          // When timer hits zero, reset to validInterval * 60
          return validInterval * 60;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [isActive, validInterval]);

  // Format time left as 'X min Y secs'
  const formatTimeLeft = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} min ${sec < 10 ? '0' : ''}${sec} secs`;
  };

  const handleStartReminders = () => {
    setIsActive(true);
  };

  const handleStopReminders = () => {
    setIsActive(false);
    setTimeLeft(validInterval * 60);
  };

  const handleIntervalChange = (e) => {
    const value = Number(e.target.value);
    setInterval(value > 0 ? value : '');
  };

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
            <>
              <p className="active-status">
                Reminders active every {validInterval} minutes<br />
                Next reminder in {formatTimeLeft(timeLeft)}
              </p>
            </>
          ) : (
            <p className="inactive-status">Reminders are currently inactive</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminder; 