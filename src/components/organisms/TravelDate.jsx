import React from "react";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSwap } from "react-icons/io";

function TravelDate() {
  const activeTrip = useSelector((state) => state.trips.activeTrip);
  if (!activeTrip) return null;

  const getDaysLeft = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = start - today;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return days;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const daysLeft = getDaysLeft(activeTrip?.startDate);

  //   console.log("Trips from Travel Date", activeTrip);

  return (
    <div className="w-[220px] h-[158px] rounded-2xl bg-white font-['Sora'] ">
      <div className="flex justify-around items-center mt-4 mb-2">
        <p className="text-lg text-[#9aa2ac]">Travel date</p>
        <BsThreeDotsVertical />
      </div>
      <div className="flex justify-center items-center mb-2">
        <span className="text-bold text-[32px]">
          {daysLeft > 0
            ? `In ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`
            : daysLeft === 0
            ? "Today"
            : "Trip ended"}
        </span>
      </div>
      <div className="flex items-center justify-center font-semibold text-xs">
        <p>{formatDate(activeTrip.startDate)}</p>
        <IoIosSwap className="mx-2" size={22} />
        <p>{formatDate(activeTrip.endDate)}</p>
      </div>
    </div>
  );
}

export default TravelDate;
