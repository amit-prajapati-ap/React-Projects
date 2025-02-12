import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center min-h-[8vh] py-1 bg-black px-[5vw]">
      <NavLink to='/' className="text-white text-2xl">NotesSnippet</NavLink>
      <div className="p-3 rounded-xl flex space-x-4 shadow-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-5 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
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
            `px-5 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-md"
                : "hover:bg-gray-700"
            }`
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
}
