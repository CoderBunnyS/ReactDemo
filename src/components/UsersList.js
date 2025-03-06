import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../API/FusionAuth';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      const tenantId = process.env.REACT_APP_FUSIONAUTH_TENANT_ID;
      const apiKey = process.env.REACT_APP_FUSIONAUTH_API_KEY;

      try {
        const data = await fetchUsers(tenantId, apiKey);
        setUsers(data.users || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{`Failed to load users: ${error}`}</p>;

  return (
    <div>
      <h2>Users List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.email} {/* Display user information as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersList;
