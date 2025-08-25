import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavBar from "./TopNavBar";
import RightTopNavbar from "../molecules/RightTopNavbar";
import NewTripModal from "./NewTripModal"; // Import your modal

const MainLayout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-auto w-full flex bg-[#FDF6E1F0]">
      <Sidebar setIsModalOpen={setIsModalOpen} />
      <div className="w-full flex flex-col">
        <div className="TopNavbar w-full flex">
          <TopNavBar />
          <RightTopNavbar />
        </div>
        {children}
      </div>
      <NewTripModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default MainLayout;
