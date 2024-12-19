import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './Dashboard';
import { AuthProvider } from './AuthContext';
import ProfilePage from './ProfilePage';
import TenantManager from './components/TenantManager';
import Users from './components/Users';
import Applications from './components/Applications';
import RolesGroups from './components/RolesGroups';
import Header from './components/Header';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Define the parent route for TenantManager */}
          <Route path="/TenantManager" element={<TenantManager />}>
            {/* Nested routes for TenantManager */}
            <Route path="users" element={<Users />} />
            <Route path="applications" element={<Applications />} />
            <Route path="roles-groups" element={<RolesGroups />} />

          </Route>
    
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
