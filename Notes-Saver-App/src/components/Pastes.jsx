import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes, resetAllPastes } from "../features/PasteSlice";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import { FiEdit, FiTrash, FiEye, FiCopy } from "react-icons/fi";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Sharing from "./Sharing";
import { emailVerify } from "@/features/UserAuthSLice";

const Pastes = () => {
  const pastes = useSelector((state) => state.PasteSlice.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useSelector((state) => state.userAuth.userInfo);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const DeletePaste = (pasteId) => {
    if (!user.emailVerified) {
      toast.success("Check Your Mail and Please Verify Your Email ID");
      dispatch(emailVerify()).unwrap();
      return;
    }
    dispatch(removeFromPastes(pasteId));
  };

  const Copying = (content) => {
    window.navigator.clipboard.writeText(content);
    toast.success("Copied");
  };

  const filteredDataDisplay = () => {
    if (filteredData.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          {filteredData.map((paste) => {
            return (
              <div
                key={paste?._id}
                className="w-full flex flex-col sm:flex-row justify-between gap-3 p-3 border border-gray-500 rounded-sm bg-zinc-950"
              >
                <div className="flex flex-col w-full sm:max-w-[50%] md:max-w-[70%]">
                  <div className="text-xl font-bold sm:text-left text-center">{paste.title}</div>
                  <div className="text-[10px] sm:block hidden">{paste.content}</div>
                </div>
                <div className="w-full sm:max-w-[30%] flex flex-col gap-2 items-center sm:items-end">
                  <div className="flex gap-3 sm:gap-1">
                      <Link to={`/?pasteId=${paste?._id}`} className="border border-gray-600 transition-all duration-300 hover:text-blue-500 cursor-pointer p-1.5 rounded-sm flex items-center justify-center px-2.5">
                        {" "}
                        <FiEdit size={12} />{" "}
                      </Link>
                    <button
                      className="border border-gray-600 transition-all duration-300 hover:text-red-500 cursor-pointer p-1.5 rounded-sm px-2.5"
                      onClick={() => DeletePaste(paste?._id)}
                    >
                      <FiTrash size={12} />
                    </button>
                    <button>
                      <Sharing title={paste.title} content={paste.content} paste={paste}/>
                    </button>
                    <button className="border border-gray-600 transition-all duration-300 hover:text-gray-500 cursor-pointer p-1.5 rounded-sm px-2.5">
                      <Link to={`/view/${paste?._id}`}>
                        {" "}
                        <FiEye size={12} />{" "}
                      </Link>
                    </button>
                    <button
                      className="border border-gray-600 transition-all duration-300 hover:text-blue-500 cursor-pointer p-1.5 rounded-sm px-2.5"
                      onClick={() => Copying(paste.content)}
                    >
                      <FiCopy size={12} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 font-bold">
                    <div>
                      <AiOutlineCalendar />
                    </div>
                    <div className="text-[11px]">{paste.createdAt}</div>
                  </div>
                  <div className="px-3 py-1 rounded-md border border-gray-500 bg-black text-green-500 font-bold text-sm shadow-md">
                    CODE
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <p className="text-center font-bold text-3xl py-2">Paste Unavailable</p>
      );
    }
  };

  let element = filteredDataDisplay();

  return (
    <div className="w-full h-[80vh] p-5">
      <div className="flex flex-col gap-4 sm:w-[80%] mx-auto">
        <div className="flex items-center justify-start gap-3 border rounded-md py-2 px-4 border-gray-600">
          <FaSearch className="text-gray-500" size={15} />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Paste..."
            className="border-none outline-none w-full"
          />
        </div>

        <div className="flex flex-col border border-gray-500 rounded-md bg-neutral-950">
          <div className="px-4 py-2.5 border-b border-gray-500 text-2xl font-bold">
            All Pastes
          </div>
          <div className="p-4 flex flex-col gap-4 max-h-[50vh] overflow-y-auto">{element}</div>
        </div>
        <div className="self-center">
          {filteredData.length > 0 ? <Button
            onClick={() => dispatch(resetAllPastes())}
            className="px-8 bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all duration-300 text-white"
           >
            Remove All
          </Button> : <Button
            className="px-8 bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all duration-300 text-white"
           >
            <Link to='/'>Create Paste</Link>
          </Button>}
        </div>
      </div>
    </div>
  );
};

export default Pastes;
