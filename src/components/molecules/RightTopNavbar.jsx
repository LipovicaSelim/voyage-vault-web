import React, { useState } from "react";
import LanguageDropdown from "./LanguageDropdown";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import DefaultProfilePic from "../../assets/0f785d55cea2a407ac8c1d0c6ef19292.jpg";
import Modal from "react-modal";
import axios from "axios";
import { updateUser } from "../../store/authSlice";
import ChangeProfileModal from "../organisms/ChangeProfileModal";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

Modal.setAppElement("#root");

function RightTopNavbar() {
  const { firstName, lastName, profilePicture, email } =
    useSelector((state) => state.auth.user) || {};
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFirstName, setEditFirstName] = useState(firstName || "");
  const [editLastName, setEditLastName] = useState(lastName || "");
  const [editProfilePicture, setEditProfilePicture] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const profilePicUrl = profilePicture
    ? profilePicture.startsWith("http")
      ? profilePicture
      : `http://localhost:5000/images${profilePicture}`
    : `${DefaultProfilePic}`;

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("email", email);
    if (editFirstName !== firstName)
      formData.append("firstName", editFirstName);
    if (editLastName !== lastName) formData.append("lastName", editLastName);
    if (editProfilePicture)
      formData.append("profilePicture", editProfilePicture);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/update-profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(updateUser(response.data.user));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  return (
    <div className="flex items-center ml-6 border-b-[0.5px] border-b-[#d7d8d9] font-['Sora'] pr-4">
      <LanguageDropdown />
      <div className="relative ml-8">
        <IoNotificationsOutline size={24} stroke="#212121" />
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>
      </div>
      <div className="ml-2 text-sm text-[#27292C] font-medium flex items-center">
        <div className="w-full">
          {firstName && lastName ? `${firstName} ${lastName}` : "User"}
        </div>
        <div className="relative ml-4">
          <div className="relative ml-4">
            <div
              onClick={() => setShowDropdown((prev) => !prev)}
              className="cursor-pointer flex items-center gap-2"
            >
              <div className="relative w-9 h-9">
                <img
                  src={profilePicUrl}
                  alt={`${firstName} ${lastName}'s profile`}
                  className="w-full h-full rounded-full object-cover ring-1 ring-black"
                />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-600 ring-2 ring-white"></span>
              </div>
              <FiChevronDown className="text-[#383737]" />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50 ">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[#383737] cursor-pointer"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            className="flex flex-col w-[90%]  max-w-[605px] h-[663px] bg-[#F0E9D5] rounded-lg shadow-lg absolute top-1/2 left-1/2 transform
             -translate-x-1/2 -translate-y-1/2 focus:outline-none "
            overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <div className="h-[104px] bg-[#E4DCC6] rounded-t-lg rounded-r-lg w-full "></div>
            <div className="rounded-lg w-[120px] h-[40px] border-[#C2BFBF] border-1 flex place-self-end justify-center items-center m-4">
              Share profile
            </div>
            <div className="pl-12 -mt-24">
              <img
                src={profilePicUrl}
                alt={`${firstName} ${lastName}'s profile`}
                className="w-[100px] h-[100px] rounded-full object-cover ring-5 ring-white mb-2"
              />
            </div>
            <div className="pl-[5%] flex flex-col border-b-[#C2BFBF] border-b-[0.5px] mx-8 pb-4">
              <span className="text-2xl font-semibold text-black font-['Sora']">
                {firstName} {""} {lastName}
              </span>
              <span className="font-['Sora'] text-[16px]">{email}</span>
            </div>
            <div className="p-6">
              <div className="flex  items-center border-b-[#C2BFBF] border-b-[0.5px] mb-4 pb-2 mx-2">
                <label className="w-[35%] text-[16px] font-['Sora'] place-self-start">
                  Full Name
                </label>
                <div className="flex gap-2 w-50%">
                  <input
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    className=" p-2 w-full mb-2 rounded-lg border-[#A49E9E] border-[0.5px] text-xl font-['Inter'] text-[#383737]
                    focus:ring-2 focus:ring-teal-500 focus:outline-none
                    "
                  />
                  <input
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    className="p-2 w-full mb-2 rounded-lg border-[#A49E9E] border-[0.5px] text-xl font-['Inter'] text-[#383737]
                    focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center border-b-[#C2BFBF] border-b-[0.5px] mb-4 pb-2 mx-2">
                <label className="w-[35%] text-[16px] font-['Sora'] place-self-start">
                  Email address
                </label>
                <input
                  defaultValue={email}
                  className="p-2 w-full mb-2 rounded-lg border-[#A49E9E] border-[0.5px] text-xl font-['Inter'] text-[#383737] bg-[#CEC8B8]
                  cursor-not-allowed "
                />
              </div>
              <div className="flex items-center border-b-[#C2BFBF] border-b-[0.5px] mb-4 mx-2 pb-2">
                <label className="w-[35%] text-[16px] font-['Sora'] place-self-start">
                  Profile Photo
                </label>
                <div className="flex items-center gap-8">
                  <img
                    src={profilePicUrl}
                    alt={`${firstName} ${lastName}'s profile`}
                    className="w-[32px] h-[32px] rounded-full object-cover ring-1 ring-black"
                  />
                  <div className="mb-2">
                    <label
                      htmlFor="profilePic"
                      className="inline-block bg-[#F0E9D5] text-[#383737] text-xl font-['Inter'] border-[0.5px] border-[#A49E9E] rounded-lg px-4 py-2 cursor-pointer hover:bg-[#e0dac7] transition"
                    >
                      Upload Profile Photo
                    </label>
                    <input
                      id="profilePic"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={(e) => setEditProfilePicture(e.target.files[0])}
                      className="hidden"
                    />
                    {editProfilePicture && (
                      <p className="mt-1 text-sm text-gray-600">
                        Selected: {editProfilePicture.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="place-self-end mt-12">
                <button
                  onClick={handleSave}
                  className="ProfileButtons bg-[#566B64] w-[178px] rounded-lg text-white p-2 mr-2 drop-shadow-md
                   cursor-pointer duration-100 ease-in"
                >
                  Save changes
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Cancel button clicked");
                    setIsModalOpen(false);
                  }}
                  className="ProfileButtons bg-[#F0E9D5] w-[160px] drop-shadow-md
                   rounded-lg border-[0.5px] border-[#d2d1cc] p-2 text-[#383737] cursor-pointer duration-100 ease-in"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
          <ChangeProfileModal />
        </div>
      </div>
    </div>
  );
}

export default RightTopNavbar;
