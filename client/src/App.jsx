//import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';

import './App.css'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Container >
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Dashboard />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router></Container>
  );
}

export default App;
