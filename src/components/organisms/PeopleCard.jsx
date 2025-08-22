import React from "react";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";

function PeopleCard() {
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

  //   console.log("Members: ", members);

  return (
    <div className="w-[220px] h-[158px] rounded-2xl bg-white font-['Sora'] mb-4">
      <div className="mt-4 flex flex-col ">
        <div className="flex justify-around items-center mb-2">
          <p className="text-lg text-[#9aa2ac]">People</p>
          <BsThreeDotsVertical />
        </div>
        <div className="self-center">
          <span className="text-bold text-[32px]">
            {members.length}{" "}
            <span className="text-semibold text-2xl">
              {members.length < 2 ? "adult" : "/ adults"}
            </span>
          </span>
        </div>
        <div className="self-center flex">
          {/* Other members as circles with initials */}
          {otherMembers.map((member, index) => (
            <div
              key={index}
              className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#F2EAD3] text-[#3B260E] font-semibold text-sm ring-2 ring-[#e4b749]"
              title={member}
            >
              {member[0]}
            </div>
          ))}
          <img
            src={profilePicture}
            alt={firstName}
            className="w-[32px] h-[32px] rounded-[50%] mr-2 -ml-2 outline-white outline-4"
          />
          <div className="mt-2 text-center text-sm text-[#3B260E] font-medium">
            {members.map((member, index) => (
              <span key={index}>
                {member.split(" ")[0]}
                {index < members.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeopleCard;
