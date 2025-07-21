import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../utils/hydrationData';
import { fetchRecommendedIntake } from '../utils/nutritionixApi';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let recommendedIntake = 2000;
    try {
      recommendedIntake = await fetchRecommendedIntake({
        age: form.age,
        gender: form.gender,
        weight: form.weight,
        height: form.height
      });
    } catch (e) {
      // fallback to local formula if API fails
      let base = form.weight * 35;
      if (form.activity === 'High') base += 400;
      else if (form.activity === 'Moderate') base += 200;
      if (form.gender === 'Male') base += 250;
      recommendedIntake = Math.round(base / 50) * 50;
    }
    updateUserData({ ...form, recommendedIntake, dailyGoal: recommendedIntake });
    navigate('/profile');
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