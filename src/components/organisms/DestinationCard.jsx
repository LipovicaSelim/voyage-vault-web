import React from "react";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlaneDeparture } from "react-icons/fa";

function DestinationCard() {
  const activeTrip = useSelector((state) => state.trips.activeTrip);
  console.log("Active Trip details: ", activeTrip);
  return (
    <div className="w-[300px] h-[158px] rounded-2xl bg-white font-['Sora'] mb-4">
      <div className="flex justify-around items-center mt-4 mb-1">
        <p className="text-lg text-[#9aa2ac]">Destination</p>
        <BsThreeDotsVertical />
      </div>
      <div className="self-center flex items-center justify-between mx-4">
        <span className="text-bold text-[32px]">{activeTrip.destination}</span>
        <FaPlaneDeparture size={32} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mx-2">
          <span>Flying time: </span>
          <span className="text-sm font-bold">
            {activeTrip.flightDetails.outbound.departureTime?.split(" ")[1]}{" "}
            {"--"}{" "}
            {activeTrip.flightDetails.outbound.arrivalTime?.split(" ")[1]}
          </span>
        </div>
        <span className="text-xs mx-2">
          {activeTrip.flightDetails.outbound.arrival?.split(") ")[0]} {") -"}
          {"  "}
          {activeTrip.flightDetails.outbound.arrival?.split(") ")[1]}
        </span>
      </div>
    </div>
  );
}

export default DestinationCard;
