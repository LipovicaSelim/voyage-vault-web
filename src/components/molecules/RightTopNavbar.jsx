import React from "react";
import LanguageDropdown from "./LanguageDropdown";
import { IoNotificationsOutline } from "react-icons/io5";

function RightTopNavbar() {
  return (
    <div className="flex items-center ml-4 border-b-1 border-b-[#c7c9cb] ">
      <LanguageDropdown />
      <div className="relative ml-6">
        <IoNotificationsOutline size={24} stroke="#212121" />
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>
      </div>
    </div>
  );
}

export default RightTopNavbar;
