import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./App.css";
import "./assets/styles/Dashboard.css"


const Dashboard = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userDisplayName, setUserDisplayName] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchUserFromAPI = async (userId) => {
      console.log("Fetching user data with ID:", userId);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_FUSIONAUTH_BASE_URL}/api/user/${userId}`,
          {
            headers: {
              Authorization: process.env.REACT_APP_FUSIONAUTH_API_KEY,
              "X-FusionAuth-TenantId":
                process.env.REACT_APP_FUSIONAUTH_TENANT_ID || "", // Optional for single-tenant setups
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          console.log("User Data:", userData);
          const displayName =
            userData.user.firstName ||
            userData.user.username ||
            userData.user.email ||
            "User";
          setUserDisplayName(displayName);
          localStorage.setItem("user_display_name", displayName);
        } else {
          const errorText = await response.text();
          console.error(
            `Failed to fetch user data: ${response.status} - ${errorText}`
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const exchangeTokenAndFetchUser = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code && !localStorage.getItem("access_token")) {
        try {
          console.log("Exchanging authorization code for tokens...");
          const tokenResponse = await fetch(
            `${process.env.REACT_APP_FUSIONAUTH_BASE_URL}/oauth2/token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                client_id: process.env.REACT_APP_FUSIONAUTH_CLIENT_ID,
                client_secret: process.env.REACT_APP_FUSIONAUTH_CLIENT_SECRET,
                code,
                grant_type: "authorization_code",
                redirect_uri: process.env.REACT_APP_FUSIONAUTH_REDIRECT_URI,
              }),
            }
          );

          if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error(
              `Token exchange failed: ${tokenResponse.status} - ${errorText}`
            );
            navigate("/");
            return;
          }

          const tokenData = await tokenResponse.json();
          console.log("Token Data:", tokenData);

          if (tokenData.access_token) {
            localStorage.setItem("access_token", tokenData.access_token);
            localStorage.setItem("refresh_token", tokenData.refresh_token);
            setIsAuthenticated(true);
            window.history.replaceState({}, document.title, "/dashboard");

            const userId = JSON.parse(
              atob(tokenData.access_token.split(".")[1])
            ).sub;
            console.log("Extracted User ID:", userId);

            await fetchUserFromAPI(userId);
          }
        } catch (error) {
          console.error("Error during token exchange:", error);
          navigate("/");
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Token already exists. Fetching user display name...");
        const storedDisplayName = localStorage.getItem("user_display_name");
        setUserDisplayName(storedDisplayName);
        setLoading(false);
      }
    };

    exchangeTokenAndFetchUser();
  }, [navigate, setIsAuthenticated]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <div className="welcome-message">
        {userDisplayName ? `Welcome, ${userDisplayName}!` : "Welcome!"}
      </div>
      <h1>Welcome to the Dashboard!</h1>
      <p>This content is only visible to logged-in users.</p>
      <button>
  <a href="https://demo.fusionauth.io/account/?client_id=02a3c029-c4f7-4468-93df-4cf553032225" target="_blank" rel="noopener noreferrer">
    User Profile
  </a>
</button>
        <button onClick={() => navigate('/TenantManager')}>
        Tenant Manager
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
