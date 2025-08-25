import React from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import SearchBar from "../molecules/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTrip } from "../../store/tripsSlice";

function TopNavBar() {
  const trips = useSelector((state) => state.trips.list);
  const activeTrip = useSelector((state) => state.trips.activeTrip);
  const dispatch = useDispatch();
  // console.log(trips);
  // console.log("Active trip: ", activeTrip);

  const handleSelectTrip = (trip) => {
    dispatch(setActiveTrip(trip));
  };

  return (
    <div className="w-[70%] h-[70px]  flex items-center font-['Sora']">
      <div className="w-full h-full flex items-center ml-16 border-b-[0.5px] border-b-[#d7d8d9]">
        <div className="text-[#27292C] text-[16px] flex w-full h-full items-center ml-4 cursor-pointer">
          <Dropdown label="Travels" inline size="lg" className="cursor-pointer">
            {trips && trips.length > 0 ? (
              trips.map((trip, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleSelectTrip(trip)}
                >
                  {trip.destination || trip.name || "Unnamed Trip"}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem>No Travels</DropdownItem>
            )}
          </Dropdown>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default TopNavBar;
