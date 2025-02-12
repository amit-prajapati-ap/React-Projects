import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoPaste,
  resetAllPastes,
  updateToPastes,
} from "../features/PasteSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaRegCopy } from "react-icons/fa6";
import toast from 'react-hot-toast';

const Home = () => {
  const allPastes = useSelector((state) => state.pastes);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };

  const createPaste = () => {
    if(!title || !value) {
      toast.error("Please Fill the Title and Content")
      return
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || nanoid(),
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    };

    if (pasteId) {
      //Update
      dispatch(updateToPastes(paste));
    } else {
      //Create
      dispatch(addtoPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams("");
  };

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setValue(paste.content);
      setTitle(paste.title);
    }
  }, [pasteId]);

  return (
    <div className="w-full max-w-[80vw] mx-auto my-6 flex flex-col items-center">
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter Title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-700 outline-gray-500"
        />
        <Button
          onClick={createPaste}
          className="bg-white text-black hover:bg-gray-200 transition-all duration-300 cursor-pointer"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </Button>
      </div>
      <div className="bg-gray-800 rounded-lg my-4 shadow-md w-full">
        {/* Header with Copy Icon */}
        <div className="m-4 pb-2 flex justify-between items-center mb-2">
          <div className="text-gray-200 font-semibold">Enter Your Content</div>
          <button
            onClick={copyToClipboard}
            className="text-gray-300 hover:text-gray-400 transition-all duration-300"
          >
            <FaRegCopy size={20} />
          </button>
        </div>
        <div>
          <Textarea
            value={value}
            placeholder="Enter Content Here..."
            onChange={(e) => setValue(e.target.value)}
            rows={20}
            className="w-full resize-none bg-white text-black p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <Button onClick={() => dispatch(resetAllPastes())} className='px-8 bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all duration-300 text-white'>Reset</Button>
    </div>
  );
};

export default Home;
