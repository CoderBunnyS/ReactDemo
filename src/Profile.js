import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_FUSIONAUTH_BASE_URL}/oauth2/userinfo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Update user state with fresh data
        } else {
          console.error('Failed to fetch user data:', await response.text());
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/');
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.name || 'N/A'}</p>
      <p><strong>Email:</strong> {user.email || 'N/A'}</p>
      <p><strong>Role:</strong> {user.role || 'N/A'}</p>
    </div>
  );
};

export default Profile;
