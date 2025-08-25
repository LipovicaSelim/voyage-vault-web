import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Logo from "../../assets/logo-svg-format.svg";
import MailIcon from "../../assets/mailIcon.png";
import PlusIcon from "../../assets/plus-round-icon 1.png";
import MinusIcon from "../../assets/minus-round-icon 1.png";
import { IoInformationCircleOutline } from "react-icons/io5";

Modal.setAppElement("#root");

function NewTripModal({ isModalOpen, setIsModalOpen }) {
  const [members, setMembers] = useState([""]);
  const [destination, setDestination] = useState("");
  const [boardingTicket, setBoardingTicket] = useState(null);
  const [hotelBooking, setHotelBooking] = useState(null);

  const handleAddMember = () => setMembers([...members, ""]);
  const handleRemoveMember = () =>
    members.length > 1 && setMembers(members.slice(0, -1));
  const handleChange = (index, value) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("destination", destination);
    const cleanedMembers = members.filter((m) => m && m.trim() !== "");
    formData.append("members", JSON.stringify(cleanedMembers));
    if (boardingTicket) formData.append("boardingTicket", boardingTicket);
    if (hotelBooking) formData.append("hotelBooking", hotelBooking);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/trips/add-trip",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Trip added:", response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Error adding trip:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="flex flex-col w-[90%] max-w-[605px] h-[663px] bg-[#F0E9D5] rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none items-center"
      overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div className="Logo flex items-center justify-center mt-16 font-['Inter']">
        <img src={Logo} alt="Logo" className="w-[72px] h-[72px]" />
        <p className="text-[#3B260E] text-5xl font-['Inter'] font-semibold">
          New Trip
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 mt-8 w-[90%] px-6">
        <div className="flex items-center gap-4 w-full border-1 border-[#bdbdbd] rounded-[12px] h-[55px] px-4">
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter the city..."
            className="w-full h-full text-lg bg-transparent outline-none text-[#144141]"
          />
        </div>
        {[
          {
            label: "Boarding ticket",
            file: boardingTicket,
            setFile: setBoardingTicket,
          },
          {
            label: "Hotel booking",
            file: hotelBooking,
            setFile: setHotelBooking,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 w-full border border-dashed border-[#BEBEBE] rounded-[12px] h-[55px] px-4"
          >
            <img src={MailIcon} alt={item.label} className="w-[28px] h-auto" />
            <div className="flex-1">
              <p className="text-[#725737] text-xl">{item.label}</p>
              <input
                type="file"
                accept=".eml,.msg"
                onChange={(e) => item.setFile(e.target.files[0])}
                className="w-full h-full text-lg bg-transparent outline-none cursor-pointer text-[#144141]"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 w-[90%] px-6 mt-4">
        <div className="flex justify-around items-center w-[138px] h-[55px] rounded-[90px] border-1 border-[#868585]">
          <button
            onClick={handleRemoveMember}
            className="w-[28px] h-[28px] rounded-full bg-[#E4DCC6] flex items-center justify-center"
          >
            <img src={MinusIcon} alt="MinusIcon" />
          </button>
          <span className="text-[#725737] font-medium text-xl">
            {members.length}
          </span>
          <button
            onClick={handleAddMember}
            className="w-[28px] h-[28px] rounded-full bg-[#E4DCC6] flex items-center justify-center"
          >
            <img src={PlusIcon} alt="PlusIcon" />
          </button>
        </div>
        <div className="w-full pr-4">
          <input
            type="text"
            value={members[0]}
            onChange={(e) => handleChange(0, e.target.value)}
            placeholder="First member"
            className="w-[70%] ml-4 px-4 py-3 rounded-md text-base placeholder:text-base text-[#144141] placeholder:text-[#9B9286] border-1 border-[#bdbdbd]"
          />
        </div>
      </div>
      {members.slice(1).map((member, index) => (
        <div key={index} className="flex items-center gap-2 px-6 mt-2 w-[90%]">
          <div className="w-[50%]">
            <input
              type="text"
              value={member}
              onChange={(e) => handleChange(index + 1, e.target.value)}
              placeholder={`Member ${index + 2}`}
              className="w-[50%] px-4 py-3 rounded-md text-base placeholder:text-base text-[#144141] placeholder:text-[#9B9286] border-1 border-[#bdbdbd]"
            />
          </div>
        </div>
      ))}
      <div className="flex gap-2 justify-end mr-4 items-center mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
          className="px-16 py-2 rounded-[20px] border-1 border-[#bdbdbd] cursor-pointer text-[#3B260E] font-semibold text-2xl items-center text-center shadow-md shadow-[#888782]"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-16 py-2 rounded-[20px] bg-[#566B64] shadow-md shadow-[#888782] text-[#F0E9D5] font-semibold text-2xl items-center text-center cursor-pointer"
        >
          Save
        </button>
      </div>
      <div className="w-[90%] my-4 flex justify-center items-center">
        <IoInformationCircleOutline size={64} />
        {
          <p className="text-sm text-[#9B9286]">
            Upload the .eml or .msg file (Download from Gmail: More  Download
            original, or Outlook: File  Save As)
          </p>
        }
      </div>
    </Modal>
  );
}

export default NewTripModal;
