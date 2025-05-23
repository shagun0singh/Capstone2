import React, { useState, useEffect } from 'react';
import { getHydrationData, updateUserData } from '../utils/hydrationData';
import './Profile.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    weight: 70,
    dailyGoal: 2000
  });

  const [stats, setStats] = useState({
    totalIntake: 0,
    averageIntake: 0
  });
  useEffect(() => {
    const data = getHydrationData();
    if (data) {
      setUserInfo(data.userData || userInfo);

      if (data.weeklyStats?.datasets?.[0]) {
        const totalIntake = data.weeklyStats.datasets[0].data.reduce((sum, amount) => sum + amount, 0);
        setStats({
          totalIntake,
          averageIntake: Math.round(totalIntake / 7)
        });
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };


  const saveProfile = () => {
    try {
      updateUserData(userInfo);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile. Please try again.');
    }
  };

  const recommendedIntake = Math.round(userInfo.weight * 33);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Your Profile</h1>
        <p>Customize your hydration settings</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h2>Personal Information</h2>
          <div className="info-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={userInfo.weight}
                onChange={handleInputChange}
                min="20"
                max="300"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Daily Water Goal (ml)</label>
              <input
                type="number"
                name="dailyGoal"
                value={userInfo.dailyGoal}
                onChange={handleInputChange}
                min="500"
                max="5000"
                className="form-input"
              />
            </div>
            <button onClick={saveProfile} className="save-btn">
              <span className="btn-icon">💾</span>
              Save Changes
            </button>
          </div>
        </div>

        <div className="profile-card">
          <h2>Hydration Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <h3>Recommended Intake</h3>
              <p className="stat-value">{recommendedIntake}ml</p>
              <p className="stat-label">Based on your weight</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📊</div>
              <h3>Average Intake</h3>
              <p className="stat-value">{stats.averageIntake}ml</p>
              <p className="stat-label">Per Day</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">💧</div>
              <h3>Total Intake</h3>
              <p className="stat-value">{stats.totalIntake}ml</p>
              <p className="stat-label">This Week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 