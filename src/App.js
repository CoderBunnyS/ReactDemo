import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './Dashboard';
import { AuthProvider } from './AuthContext';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
