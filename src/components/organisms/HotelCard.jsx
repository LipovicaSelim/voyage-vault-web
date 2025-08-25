import React from "react";
import HotelCardMask from "../../assets/Mask group - hotel.png";
import LeonsHotel from "../../assets/Leon's Hotel.png";
import { useSelector } from "react-redux";

function HotelCard() {
  const activeTrip = useSelector((state) => state.trips.activeTrip);

  return (
    <div
      className="relative w-[55%] max-w-[580px] h-[348px] bg-cover bg-center rounded-3xl overflow-hidden shadow-md px-4"
      style={{ backgroundImage: `url(${HotelCardMask})` }}
    >
      <div className=" text-black text-2xl font-semibold mt-6 flex justify-between mb-4">
        <div>
          <span className="">Hotel Detail</span>
          <div className="bg-neutral-300 rounded-xl flex flex-col pr-4 mr-2">
            <span className="text-lg">{activeTrip.hotelDetails.name}</span>
            <span className="text-sm">{activeTrip.hotelDetails.address}</span>
          </div>
        </div>
        <img src={LeonsHotel} alt="Rome Airport" />
      </div>
      <div className="flex gap-1 mb-8 justify-center">
        <div className="flex flex-col mt-2 border-r b-neutral-500 pr-1">
          <label className="text-neutral-500 text-sm">Check in</label>
          <span className="text-sm font-bold">
            {activeTrip.hotelDetails.checkIn}
          </span>
        </div>
        <div className="flex flex-col mt-2 border-r b-neutral-500 px-2">
          <label className="text-neutral-500 text-sm">Check Out</label>
          <span className="text-sm font-bold">
            {activeTrip.hotelDetails.checkOut}
          </span>
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-neutral-500 text-sm">Nights</label>
          <span className="text-2xl font-extrabold">
            {activeTrip.hotelDetails.nights}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span>Confirmation number: </span>
        <span className="text-3xl font-bold">
          {activeTrip.hotelDetails.confirmationNumber}
        </span>
      </div>
    </div>
  );
}

export default HotelCard;
