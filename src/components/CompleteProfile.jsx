import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../utils/hydrationData';

const CompleteProfile = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    activity: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateRecommendedIntake = (weight, gender, activity) => {
    // Simple formula: 35ml per kg, + extra for activity, + extra for male
    let base = weight * 35; // 35ml per kg
    if (activity === 'High') base += 400;
    else if (activity === 'Moderate') base += 200;
    if (gender === 'Male') base += 250;
    return Math.round(base / 50) * 50; // round to nearest 50ml
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const weight = parseInt(form.weight, 10) || 0;
    const recommendedIntake = calculateRecommendedIntake(weight, form.gender, form.activity) || 2000;
    const userData = {
      ...form,
      recommendedIntake,
      dailyGoal: recommendedIntake // default to recommended
    };
    updateUserData(userData);
    navigate('/');
  };

  return (
    <div className="profile-container complete-profile">
      <div className="profile-card profile-header">
        <h2>Complete Your Profile</h2>
      </div>
      <div className="profile-card">
        <form onSubmit={handleSubmit} className="info-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
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
              value={form.gender}
              onChange={handleChange}
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
              value={form.weight}
              onChange={handleChange}
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
              value={form.height}
              onChange={handleChange}
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
              value={form.activity}
              onChange={handleChange}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile; 