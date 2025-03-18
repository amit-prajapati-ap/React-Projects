import React from "react";
import logo from "../assets/ytLogoRectangle1.png";
import { FaBars, FaMicrophone, FaPlus, FaSearch } from "react-icons/fa";
import { MdNotificationsNone, MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = ({ setSidebar }) => {
  return (
    <nav className="bg-[#151515] sticky top-0 w-full flex justify-between py-[8px] px-6 items-center z-10">
      <div className="flex gap-2 pl-4.5 items-center">
        <div className="pr-4">
          <FaBars
            size={24}
            className="cursor-pointer"
            onClick={() => setSidebar(true)}
          />
        </div>
        <Link to={'/'} className="flex justify-center items-center gap-1 cursor-pointer">
          <img src={logo} width={40} />
          <p className="font-youtube font-bold text-white text-2xl">OnceTube</p>
        </Link>
      </div>

      <div className="flex gap-4 w-[40%]">
        <div className="flex justify-between rounded-full border-[#484848ad] overflow-x-hidden grow border-2">
          <input
            type="text"
            placeholder="Search"
            className="bg-[#151515] text-white text-xl placeholder-gray-400 py-3 px-6 focus:outline-none w-full"
          />
          <div className="bg-[#222222] py-4 px-8 border-l border-[#303030] cursor-pointer">
            <FaSearch size={23} className="text-gray-400" />
          </div>
        </div>

        <div className="rounded-full p-4 bg-[#222222] cursor-pointer">
          <FaMicrophone size={24} />
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <div className="flex rounded-full px-6 bg-[#222222] items-center gap-3 text-xl cursor-pointer">
          <FaPlus />
          <p className="font-[400]">Create</p>
        </div>
        <div className="flex items-center cursor-pointer">
          <MdNotificationsNone size={35} color="white" />
        </div>
        <div className="rounded-full flex items-center mx-6 cursor-pointer">
          <MdAccountCircle size={45} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
