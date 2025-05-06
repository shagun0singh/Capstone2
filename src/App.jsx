import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import HydrationTracker from './components/HydrationTracker'
import Profile from './components/Profile'
import { initializeData } from './utils/hydrationData'
import './App.css'
//ggg


function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hydration" element={<HydrationTracker />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
