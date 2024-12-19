import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const TenantManager = () => {
  return (
    <div className="tenant-manager">
      <header>
        <h1>Tenant Manager Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="users">Users</Link></li>
            <li><Link to="applications">Applications</Link></li>
            <li><Link to="roles-groups">Roles & Groups</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        {/* The Outlet component renders the matched child route */}
        <Outlet />
      </main>
    </div>
  );
};

export default TenantManager;
