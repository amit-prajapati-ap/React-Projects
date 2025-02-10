import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../features/PasteSlice";
import toast from "react-hot-toast";

const Pastes = () => {
  const pastes = useSelector((state) => state.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const DeletePaste = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const Copying = (content) => {
    window.navigator.clipboard.writeText(content);
    toast.success("Copied");
  };

  const Sharing = async (title, content) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: { title },
          text: { content },
          url: window.location.href,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <div>
      <div>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Paste..."
        />

        <div className="flex flex-col gap-5">
          {filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div key={paste?._id}>
                  <div>{paste.title}</div>
                  <div>{paste.content}</div>
                  <div>
                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                    </button>
                    <button>
                      <a href={`/pastes/${paste?._id}`}>View</a>
                    </button>
                    <button onClick={() => DeletePaste(paste?._id)}>
                      Delete
                    </button>
                    <button onClick={() => Copying(paste.content)}>Copy</button>
                    <button onClick={() => Sharing(paste.title, paste.content)}>
                      Share
                    </button>
                  </div>
                  <div>{paste.createdAt}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Pastes;
