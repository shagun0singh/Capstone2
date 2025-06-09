import React, { useState, useEffect } from 'react';
import './Reminder.css';

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [interval, setInterval] = useState(60);
  const [isActive, setIsActive] = useState(false);

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
      }, interval * 60 * 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, interval]);

  const handleStartReminders = () => {
    setIsActive(true);
  };

  const handleStopReminders = () => {
    setIsActive(false);
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
                onChange={(e) => setInterval(Number(e.target.value))}
                min="15"
                max="180"
                disabled={isActive}
              />
            </label>
          </div>
          <div className="reminder-buttons">
            {!isActive ? (
              <button onClick={handleStartReminders} className="start-btn">
                Start Reminders
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
            <p className="active-status">Reminders active every {interval} minutes</p>
          ) : (
            <p className="inactive-status">Reminders are currently inactive</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminder; 