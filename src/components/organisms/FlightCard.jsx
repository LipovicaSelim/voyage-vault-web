import React from "react";
import FlightTicket from "../../assets/Mask group.png";
import RomeAirport from "../../assets/romeairport.png";
import MovieIconFlight from "../../assets/movie-icon-flight.png";
import UserIcon from "../../assets/user-icon.png";
import { useSelector } from "react-redux";

function FlightCard() {
  const activeTrip = useSelector((state) => state.trips.activeTrip);
  const { firstName, profilePicture } =
    useSelector((state) => state.auth.user) || {};

  const rawMembers = activeTrip?.members || [];

  const members = Array.isArray(rawMembers)
    ? rawMembers
    : typeof rawMembers === "string"
    ? JSON.parse(rawMembers)
    : [];

  const otherMembers =
    members?.filter(
      (member) =>
        !firstName || !member?.toLowerCase().includes(firstName.toLowerCase())
    ) || [];
  return (
    <div
      className="relative w-[360px] h-[348px] bg-cover bg-center rounded-3xl overflow-hidden shadow-md px-4"
      style={{ backgroundImage: `url(${FlightTicket})` }}
    >
      <div className=" text-black text-2xl font-semibold mt-6 flex justify-between mb-4">
        <span className="ml-4">Boarding Ticket</span>
        <img src={RomeAirport} alt="Rome Airport" />
      </div>
      <div className="flex items-center justify-around">
        <div className="flex items-center gap-2">
          <img src={MovieIconFlight} alt="Movie Flight Icon" />
          <span>Movie</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={UserIcon} alt="User Icon" />
          <span className="text-semibold text-lg">
            {members.length}{" "}
            <span className="text-semibold text-lg">
              {members.length < 2 ? "adult" : " adults"}
            </span>
          </span>
        </div>
      </div>
      <div className="flex gap-1 mb-8 justify-center">
        <div className="flex flex-col mt-2 border-r b-neutral-500 pr-1">
          <label className="text-neutral-500 text-sm">Payee's Name</label>
          <span className="text-lg font-extrabold">{members[0]}</span>
        </div>
        <div className="flex flex-col mt-2 border-r b-neutral-500 px-2">
          <label className="text-neutral-500 text-sm">Flight Type</label>
          <span className="text-sm font-extrabold">Economy</span>
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-neutral-500 text-sm">Flight Code</label>
          <span className="text-lg font-extrabold">
            {activeTrip.flightDetails.outbound.flightNumber}
          </span>
        </div>
      </div>
      <div className="text-bold text-center text-2xl bg-neutral-200 rounded-xl border-b-indigo-500 border-dashed border-b-2">
        <span>{activeTrip.flightDetails.outbound.arrival.split(") ")[1]}</span>
      </div>
    </div>
  );
}

export default FlightCard;
