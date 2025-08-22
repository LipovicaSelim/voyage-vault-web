import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import Sidebar from "../components/organisms/Sidebar";
import TopNavBar from "../components/organisms/TopNavBar";
import RightTopNavbar from "../components/molecules/RightTopNavbar";
import NoTrips from "../components/organisms/NoTrips";
import CalendarComponent from "../components/organisms/calendar/Partials/Calendar";
import AddMomentsLayout from "../components/organisms/AddMomentsLayout";
import NewTripModal from "../components/organisms/NewTripModal";
import { setTrips } from "../store/tripsSlice";
import TripLayout from "../components/organisms/TripLayout";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.list) || [];

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

        const tripRes = await axios.get(
          "http://localhost:5000/api/trips/getTrips",
          {
            withCredentials: true,
          }
        );
        dispatch(setTrips(tripRes.data.trips));
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
    <div className="h-auto w-full flex bg-[#FDF6E1F0]">
      {/* Sidebar always visible */}
      <Sidebar setIsModalOpen={setIsModalOpen} />

      {/* Main content area */}
      <div className="w-full flex flex-col">
        {/* Top navigation */}
        <div className="TopNavbar w-full flex">
          <TopNavBar />
          <RightTopNavbar />
        </div>

        {/* Main view below nav */}
        <div className="w-full flex justify-between px-4">
          {/* If there are no trips, show NoTrips and AddMomentsLayout */}
          {trips.length === 0 ? (
            <>
              <div className="flex flex-col">
                <NoTrips className="w-3/5" />
                <AddMomentsLayout />
                <button
                  onClick={handleLogout}
                  className="px-2 py-4 bg-[#668F82] text-white rounded-tr-lg cursor-pointer mt-6"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-[64%] flex flex-col justify-center items-center py-12 text-[#3B260E] text-lg font-medium">
                <TripLayout />
              </div>
              <CalendarComponent
                date={date}
                setDate={setDate}
                selectRange={false}
              />
            </>
          )}
        </div>
      </div>

      {/* Trip creation modal */}
      <NewTripModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}

export default Dashboard;
