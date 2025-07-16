import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import HydrationTracker from './components/HydrationTracker'
import Profile from './components/Profile'
import TodayProgress from './components/TodayProgress'
import Reminder from './components/Reminder'
import { initializeData } from './utils/hydrationData'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'
//ggg


function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/today" element={<PrivateRoute><TodayProgress /></PrivateRoute>} />
            <Route path="/reminder" element={<PrivateRoute><Reminder /></PrivateRoute>} />
            <Route path="/hydration" element={<PrivateRoute><HydrationTracker /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
