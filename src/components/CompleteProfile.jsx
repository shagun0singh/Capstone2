import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="complete-profile-container">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="complete-profile-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" required />
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight (kg)" required />
        <input name="height" value={form.height} onChange={handleChange} placeholder="Height (cm)" required />
        <select name="activity" value={form.activity} onChange={handleChange} required>
          <option value="">Activity Level</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CompleteProfile; 