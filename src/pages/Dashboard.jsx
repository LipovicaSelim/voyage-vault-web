import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // TO DO : Right now the protected route is located only at dashboard, need to make a general route protection!!!

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/refresh-token",
        {},
        { withCredentials: true }
      );
      console.log("Token refreshed:", response.data.message);
      return true;
    } catch (err) {
      console.error("Refresh error:", err.response?.data || err.message);
      setError("Session expired. Please log in again.");
      navigate("/signin");
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log("Logout succesful");
      navigate("/signup");
    } catch (error) {
      console.log("Logout error: ", error.response?.data || error.message);
      setError(
        "Failed to log out: ",
        +(error.response?.data.message || error.message)
      );
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/", {
          withCredentials: true,
        });
        setData(response.data);
      } catch (err) {
        console.error("Dashboard error:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            // Retry the dashboard request after successful refresh of the token
            const retryResponse = await axios.get(
              "http://localhost:5000/api/auth/",
              {
                withCredentials: true,
              }
            );
            setData(retryResponse.data);
          }
        } else {
          setError(
            "Failed to load dashboard: " +
              (err.response?.data.message || err.message)
          );
        }
      }
    };
    fetchDashboard();
  }, []);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.message}</h1>
      <p>User ID: {data.user.userId}</p>
      <button
        onClick={handleLogout}
        className="px-2 py-4 bg-[#668F82] text-white rounded-lg cursor-pointer mt-6"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
