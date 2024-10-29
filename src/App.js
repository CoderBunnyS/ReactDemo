import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import Callback from './Callback';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/callback" element={<Callback />} />
        </Routes>
    </Router>
  );
}

export default App;
