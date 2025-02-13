//import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'

import './App.css'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Dashboard />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
