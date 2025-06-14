import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeShape from "../../assets/Home-Icon.svg";
import AirplaneIcon from "../../assets/Airplane Icon.svg";
import Logo from "../../assets/logo-svg-format.svg";
import Brochures from "../../assets/brochure-catalog-icon.svg";
import BusIcon from "../../assets/bus-icon.svg";
import EiffelTower from "../../assets/eiffel-tower-paris-icon.svg";
import ThreeDots from "../../assets/ellipsis-v-icon.svg";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const tripCount = useSelector((state) => state.auth.tripCount || 0);

  const navItems = [
    { icon: HomeShape, label: "Home", path: "/" },
    { icon: Brochures, label: "All Trips", path: "/all-trips" },
    { icon: AirplaneIcon, label: "Travels", path: "/travels" },
    { icon: BusIcon, label: "Transport", path: "/transport" },
    { icon: EiffelTower, label: "Attractions", path: "/attractions" },
  ];

  return (
    <div
      className={`sidebar ${isCollapsed} ? "collapsed" : "" w-1/4 h-full bg-[#42786DC9] flex flex-col font-[Sora] rounded-tr-lg`}
    >
      <div className="logo flex justify-between items-center mt-2 mb-6">
        <div className="flex items-center justify-start ">
          <img src={Logo} alt="Logo" className="w-[30%]" />
          <span className="text-[#27292C] text-[24px] font-bold">
            VoyageVault
          </span>
        </div>
        <img
          src={ThreeDots}
          alt="three-dots"
          className="toggle-btn  pr-4 w-[21px]"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        ></img>
      </div>

      <nav className="flex flex-col items-center">
        <button
          className="new-trip-btn w-[244px] h-[76px] rounded-2xl bg-[#3F98CF] mb-4 shadow-[rgba(52, 106, 255, 0.15)]
        duration-100 ease-in"
        >
          <span className="text-white text-2xl font-bold">+ New trip</span>
        </button>
        <ul className="w-full items-start justify-center flex flex-col gap-2">
          {navItems.map((item) => (
            <li
              key={item.path}
              className="flex items-center justify-start w-full h-[51px]"
            >
              <Link
                to={item.path}
                className="nav-link flex pl-12 w-full h-full items-center duration-100 ease-in "
                aria-label={item.label}
                title={item.label}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="pr-4 w-[40px] h-auto max-h-[70%]"
                />
                {!isCollapsed && (
                  <span className="label text-xl font-semibold text-[#DDE5D6]">
                    {item.label}{" "}
                    {item.badge > 0 && (
                      <span className="badge">{item.badge}</span>
                    )}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
