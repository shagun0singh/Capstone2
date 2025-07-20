import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: 'User' }); 
  const [editingInfo, setEditingInfo] = useState({});

  const handleEdit = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleSave = (updatedInfo) => {
    setUserInfo(updatedInfo);
    setShowModal(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card profile-header">
        <h2>Profile</h2>
        <div className="profile-name-row">
          <span className="profile-name">{userInfo.name}</span>
          <button className="edit-btn" onClick={handleEdit}>Edit</button>
        </div>
      </div>
      <div className="profile-card">
        <h2>Hydration Statistics</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">🎯</div>
            <h3>Recommended Intake</h3>
            <p className="stat-value">2.5 liters/day</p>
            <p className="stat-label">Based on your weight</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">📊</div>
            <h3>Average Intake</h3>
            <p className="stat-value">1500ml</p>
            <p className="stat-label">Per Day</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">💧</div>
            <h3>Total Intake</h3>
            <p className="stat-value">10500ml</p>
            <p className="stat-label">This Week</p>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSave(editingInfo);
              }}
              className="info-form"
            >
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingInfo.name || ''}
                  onChange={e => setEditingInfo({ ...editingInfo, name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={editingInfo.age || ''}
                  onChange={e => setEditingInfo({ ...editingInfo, age: e.target.value })}
                  className="form-input"
                  min="1"
                  max="120"
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={editingInfo.gender || ''}
                  onChange={e => setEditingInfo({ ...editingInfo, gender: e.target.value })}
                  className="form-input"
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={editingInfo.weight || ''}
                  onChange={e => setEditingInfo({ ...editingInfo, weight: e.target.value })}
                  className="form-input"
                  min="1"
                  max="500"
                  required
                />
              </div>
              <div className="form-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={editingInfo.height || ''}
                  onChange={e => setEditingInfo({ ...editingInfo, height: e.target.value })}
                  className="form-input"
                  min="30"
                  max="300"
                  required
                />
              </div>
              <div className="form-group">
                <label>Activity Level</label>
                <select
                  name="activity"
                  value={editingInfo.activity || ''}
                  onChange={e => setEditingInfo({ ...editingInfo, activity: e.target.value })}
                  className="form-input"
                  required
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="close-btn" onClick={handleClose}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 