import React from "react";
import RomeAnimation from "../../assets/rome-animation.png";
import TravelDate from "./TravelDate";
import { useSelector } from "react-redux";
import PeopleCard from "./PeopleCard";
import DestinationCard from "./DestinationCard";
import FlightCard from "./FlightCard";
import HotelCard from "./HotelCard";
import LeafletMap from "./LeafletMap";

function TripLayout() {
  const activeTrip = useSelector((state) => state.trips.activeTrip);

  return (
    <div className="w-full   h-full flex flex-col">
      <div className="flex justify-between w-full">
        <div className="font-['Inter'] ml-12">
          <h3 className="text-2xl mb-4">Dashboard</h3>
          <h3 className="text-2xl mb-18">Next Trip</h3>
          <h1 className="font-semibold text-7xl">
            {activeTrip?.destination || "No Trip"}
          </h1>
        </div>
        <img
          src={RomeAnimation}
          alt="Rome Animation"
          className="max-w-[400px] h-auto object-contain self-start "
        />
      </div>
      <div className="flex gap-2 w-full">
        <TravelDate />
        <PeopleCard />
        <DestinationCard />
      </div>
      <div className="flex justify-center">
        <FlightCard />
        <HotelCard />
      </div>
      <div>
        <LeafletMap />
      </div>
    </div>
  );
}

export default TripLayout;
