import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import Sidebar from "../components/organisms/Sidebar";
import TopNavBar from "../components/organisms/TopNavBar";
import RightTopNavbar from "../components/molecules/RightTopNavbar";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/verify-token",
          {
            withCredentials: true,
            timeout: 5000,
          }
        );
        setUser(response.data.user);
      } catch (err) {
        console.error(
          "Fetch user error:",
          err.response?.data?.message || err.message
        );
        setError("Failed to load user data. Please log in again.");
        dispatch(logout());
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate, dispatch]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data?.message || error.message
      );
      setError(
        "Failed to log out: " + (error.response?.data?.message || error.message)
      );
    }
  };

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="h-screen w-full flex bg-[#FDF6E1F0]">
      <Sidebar />
      <div className="w-full flex flex-col">
        <div className="w-full flex">
          <TopNavBar />
          <RightTopNavbar />
        </div>
        <div>
          <div className="flex flex-col self-center mt-4">
            <h1>Welcome to VoyageVault</h1>
            <p>User ID: {user.id}</p>
            <p>
              User Full Name: {user.firstName} {user.lastName}
            </p>
            <p>User's email: {user.email}</p>
            <p>User has profile pic: {user.profilePicture ? `Yes` : "No"}</p>
            <button
              onClick={handleLogout}
              className="px-2 py-4 bg-[#668F82] text-white rounded-tr-lg cursor-pointer mt-6"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
