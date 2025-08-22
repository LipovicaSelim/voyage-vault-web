import React from "react";
import NoTripsImage from "../../assets/no-trips-image.png";

function NoTrips() {
  return (
    <div>
      <div className="text-center py-10 font-['Inter']">
        <h3 className="text-left text-2xl text-[#505656] mb-2">Dashboard</h3>
        <h2 className="text-5xl font-medium  text-[#4A4848] text-left">
          No trips yet
        </h2>
        <img src={NoTripsImage} alt="No trips yet" className="mx-auto mb-4" />
        <p className="text-[#323232] text-xl  w-3/5 text-left">
          Start by creating a new trip to organize your travel itineraries in
          one place.
        </p>
        <div className="mt-6"></div>
      </div>
    </div>
  );
}

export default NoTrips;
