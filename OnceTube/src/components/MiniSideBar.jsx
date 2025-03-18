import React, { useEffect } from "react";
import { PiBroadcastBold } from "react-icons/pi";
import {
  MdHistory,
  MdHome,
  MdOutlineWatchLater,
  MdWhatshot,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import { fetchVideos } from "../youtube/FetchVideos";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../features/VideosSlice";

const MiniSideBar = () => {
  const locate = useLocation();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories.category);

  const getVideos = async () => {
    const data = await fetchVideos({ category });
    dispatch(setVideos(data));
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div
      className={`w-27 flex flex-col px-2 py-2 gap-5 ${
        locate.pathname.includes("video") ? "hidden" : ""
      }`}
    >
      <div
        onClick={getVideos}
        className="flex flex-col items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300"
      >
        <MdHome size={35} className="cursor-pointer" />
        <p className="text-sm">Home</p>
      </div>
      <div className="flex flex-col items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300">
        <MdWhatshot size={35} className="cursor-pointer" />
        <p className="text-sm">Subscription</p>
      </div>
      <div className="flex flex-col items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300">
        <MdHistory size={35} className="cursor-pointer" />
        <p className="text-sm">You</p>
      </div>
      <div className="flex flex-col items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300">
        <PiBroadcastBold size={35} className="cursor-pointer" />
        <p className="text-sm">Explore</p>
      </div>
      <div className="flex flex-col items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300">
        <MdOutlineWatchLater size={35} className="cursor-pointer" />
        <p className="text-sm">Watch Later</p>
      </div>
    </div>
  );
};

export default MiniSideBar;
