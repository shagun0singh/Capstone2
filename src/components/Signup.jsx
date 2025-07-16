import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../components/Reminder.css'; // Reuse themed styles

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="reminder-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="reminder-content" style={{ maxWidth: 400, width: '100%', padding: '3rem' }}>
        <div className="reminder-header" style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign up for Hydration Tracker</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input ref={emailRef} type="email" placeholder="Email" required className="interval-selector input" style={{ fontSize: '1.1rem' }} />
          <input ref={passwordRef} type="password" placeholder="Password" required className="interval-selector input" style={{ fontSize: '1.1rem' }} />
          <button type="submit" disabled={loading} className="start-btn" style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Sign Up</button>
          {error && <div className="error" style={{ color: 'var(--accent-color)', background: 'rgba(255,71,87,0.08)', borderRadius: '12px', padding: '0.75rem', textAlign: 'center', fontWeight: 500 }}>{error}</div>}
        </form>
        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Log in</Link>
        </div>
      </div>
    </div>
  );
} 