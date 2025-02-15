import React from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import image from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-y">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link
              to="/"
              className="text-white text-lg sm:text-xl flex items-center justify-center gap-1"
            >
              {" "}
              <img src={image} className="w-[40px] sm:w-[50px]" /> NotesSnippet
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Resources
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/pastes" className="hover:underline">
                    Pastes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-500 font-medium flex flex-col justify-between h-[65px] flex-wrap gap-3">
                <li>
                  <a
                    href="https://github.com/amit-prajapati-ap"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/Prajapatiamitap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/amit-prajapati-0544882b5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Linkdin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NotesSnippet. All Rights Reserved.
          </p>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a
              href="https://github.com/amit-prajapati-ap"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/amit-prajapati-0544882b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaLinkedin size={28} />
            </a>
            <a
              href="https://x.com/Prajapatiamitap"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaXTwitter size={28} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
