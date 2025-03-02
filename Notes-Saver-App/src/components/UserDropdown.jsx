import React, { useState } from "react";
import { FaSignOutAlt, FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import image from "../assets/defaultProfile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, emailVerify, logout } from "@/features/UserAuthSLice";
import toast from "react-hot-toast";

const UserDropdown = () => {
  const { user } = useSelector((state) => state.userAuth.userInfo);
  const profileImage = user?.photoURL;
  const profileName = user?.displayName;
  const profileEmail = user?.email;
  const isVerified = user?.emailVerified;

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteUserAccount = async (e) => {
    e.preventDefault();
    dispatch(deleteUser()).unwrap();
  };

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout()).unwrap();
  };

  const emailVerification = () => {
    toast.success("Check Your Mail and Verify Your Email ID")
    dispatch(emailVerify()).unwrap();
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 cursor-pointer"
      >
        <img
          src={profileImage || image}
          alt=""
          onError={(e) => (e.target.src = image)}
          width={25}
          className="w-10 h-10 rounded-full text-sm "
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-46 bg-gray-900 text-white shadow-lg rounded-xl p-4 z-50">
          {/* Profile Section */}
          <div className="text-center relative">
            <img
              src={profileImage || image}
              alt=""
              onError={(e) => (e.target.src = image)}
              className="w-16 h-16 rounded-full mx-auto border-2 border-gray-600"
            />
            <h3 className="text-lg font-semibold mt-2">Hi, {profileName}!</h3>
            <p className="text-gray-400 text-sm">{profileEmail}</p>
            { !isVerified && <p onClick={emailVerification} className="pt-1 text-blue-500 cursor-pointer hover:text-blue-600 transition-all duration-200 w-38">Verify Email</p> }
            <p className="absolute top-10 right-10 rounded-full p-1.5 bg-black cursor-pointer">
              <FaPencilAlt />
            </p>
          </div>

          {/* Search History & Delete */}
          <div className="mt-4">
            <button
              onClick={logoutUser}
              className="flex items-center space-x-3 w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-all duration-300"
            >
              <FaSignOutAlt className="text-gray-400" />
              <span>Log out</span>
            </button>
            <button
              onClick={deleteUserAccount}
              className="flex items-center space-x-3 w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 mt-2 cursor-pointer transition-all duration-300"
            >
              <FaTrash className="text-gray-400" />
              <span className="text-red-600">Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
