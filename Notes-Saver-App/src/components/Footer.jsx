import React from 'react'
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://github.com/amit-prajapati-ap" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaGithub size={28} />
          </a>
          <a href="https://www.linkedin.com/in/amit-prajapati-0544882b5/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaLinkedin size={28} />
          </a>
          <a href="https://x.com/Prajapatiamitap" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaXTwitter size={28} />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-6 text-gray-400 text-sm mb-4">
          <NavLink to="/" className="hover:text-white">Home</NavLink>
          <NavLink to="/pastes" className="hover:text-white">Pastes</NavLink>
        </div>

        {/* Copyright Notice */}
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} NotesSnippet. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
