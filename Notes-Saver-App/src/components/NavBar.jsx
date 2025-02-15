import React from "react";
import { NavLink } from "react-router-dom";
import image from "../assets/Logo.png";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center min-h-[8vh] py-1 bg-black px-[5vw]">
      <NavLink
        to="/"
        className="text-white text-lg sm:text-xl flex items-center justify-center gap-1"
      >
        {" "}
        <img src={image} className="w-[40px] sm:w-[50px]" /> NotesSnippet
      </NavLink>
      <div className="sm:p-3 rounded-xl flex sm:space-x-4 shadow-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-white font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-md"
                : "hover:bg-gray-700"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-white font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-md"
                : "hover:bg-gray-700"
            }`
          }
        >
          Pastes
        </NavLink>

        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-white font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-md"
                : "hover:bg-gray-700"
            }`
          }
        >
          Login
        </NavLink>
      </div>
      <UserDropdown />
    </nav>
  );
}
