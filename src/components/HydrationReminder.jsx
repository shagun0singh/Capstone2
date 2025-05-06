import React, { useState, useEffect } from 'react';
import './HydrationReminder.css';

const HydrationReminder = ({ onReminderSet }) => {
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
    onReminderSet(true);
  };

  const handleStopReminders = () => {
    setIsActive(false);
    onReminderSet(false);
  };

  return (
    <div className="reminder-container">
      <h3>Hydration Reminders</h3>
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
  );
};

export default HydrationReminder; 