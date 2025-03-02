import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegCopy } from "react-icons/fa6";
import { Textarea } from "./ui/textarea";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.PasteSlice.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };
  return (
    <div className=" h-[80vh] bg-slate-950 -mt-6">
    <div className="w-full max-w-[90vw] sm:max-w-[80vw] mx-auto my-6 flex flex-col items-center">
      <div className="bg-gray-800 rounded-lg my-4 shadow-md w-full">
        {/* Header with Copy Icon */}
        <div className="m-4 pb-2 flex justify-between items-center mb-2">
          <div className="text-gray-200 font-semibold">{paste.title}</div>
          <button
            onClick={copyToClipboard}
            className="text-gray-300 hover:text-gray-400 transition-all duration-300 cursor-pointer"
          >
            <FaRegCopy size={20} />
          </button>
        </div>
        <div>
          <Textarea
            value={paste.content}
            rows={20}
            className="w-full resize-none bg-white text-black p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewPaste;
