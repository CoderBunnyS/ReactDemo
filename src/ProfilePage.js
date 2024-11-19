import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState({ firstName: '', lastName: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with actual values
  const userId = 'YOUR_USER_ID';
  const accessToken = 'YOUR_ACCESS_TOKEN';
  const fusionAuthDomain = 'https://your-fusionauth-domain.com';

  // Fetch user data on component mount
  useEffect(() => {
    fetch(`${fusionAuthDomain}/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => {
        setUserData({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data.');
        setLoading(false);
      });
  }, [fusionAuthDomain, userId, accessToken]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${fusionAuthDomain}/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userData }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        alert('Profile updated successfully');
      })
      .catch((err) => {
        console.error('Error updating profile:', err);
        alert('An error occurred while updating your profile.');
      });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Update Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '10px 15px', fontSize: '16px' }}>
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
