import { useState } from "react";
import { FiX, FiCopy } from "react-icons/fi";
import { AiOutlineLink } from "react-icons/ai";
import { FaTelegramPlane, FaWhatsapp, FaFacebook } from "react-icons/fa";

const Sharing = ({ title, content, paste }) => {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = window.location.href + `/${paste?._id}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: content,
          url: shareUrl,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="border border-gray-600 transition-all duration-300 hover:text-yellow-500 cursor-pointer p-1.5 rounded-sm"
      >
        <AiOutlineLink size={18} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm shadow-2xl shadow-gray-900">
          <div className="bg-gray-900 text-white p-4 rounded-md shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Share link</h3>
              <button className="cursor-pointer rounded-full hover:bg-zinc-950 p-4 transition-all duration-300" onClick={() => setIsOpen(false)}>
                <FiX size={18} />
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Anyone who has this link will be able to view this.
            </p>

            {/* Link Input */}
            <div className="flex items-center mt-3 border border-gray-600 rounded-md p-2 bg-gray-800">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="bg-transparent text-blue-400 w-full outline-none"
              />
              <button
                onClick={handleCopy}
                className="ml-2 text-gray-400 hover:text-white cursor-pointer"
              >
                <FiCopy size={18} />
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-4 mt-3">
              <a
                href={`https://t.me/share/url?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane
                  size={24}
                  className="text-blue-400 hover:text-blue-500"
                />
              </a>
              <a
                href={`https://wa.me/?text=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp
                  size={24}
                  className="text-green-400 hover:text-green-500"
                />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook
                  size={24}
                  className="text-blue-500 hover:text-blue-600"
                />
              </a>
            </div>

            {/* Native Share Button */}
            <button
              onClick={handleNativeShare}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md cursor-pointer"
            >
              Share via Device
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sharing;
