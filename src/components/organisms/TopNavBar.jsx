import React from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import SearchBar from "../molecules/SearchBar";

function TopNavBar() {
  return (
    <div className="w-[70%] h-[70px]  flex items-center font-['Sora'] ">
      <div className="w-full h-full flex items-center ml-16 border-b-[0.5px] border-b-[#d7d8d9]">
        <div className="text-[#27292C] text-[16px] flex w-full h-full items-center ml-4">
          <Dropdown label="Travels" inline size="lg">
            <DropdownItem>No Travels</DropdownItem>
          </Dropdown>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default TopNavBar;
