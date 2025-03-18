import React, { useEffect } from "react";
import { setCategory } from "../features/CategoriesSlice";
import logo from "../assets/ytLogoRectangle1.png";
import tom from "../assets/tom.png";
import jack from "../assets/jack.png";
import { FaBars } from "react-icons/fa";
import { FiShoppingBag, FiMusic } from "react-icons/fi";
import { GiClothes } from "react-icons/gi";
import {
  MdHistory,
  MdHome,
  MdOutlineNewspaper,
  MdOutlineWatchLater,
  MdVideoLibrary,
  MdWhatshot,
} from "react-icons/md";
import {
  AiOutlineGithub,
  AiOutlineLike,
  AiOutlineLinkedin,
  AiOutlineX,
} from "react-icons/ai";
import { IoMdTrophy } from "react-icons/io";
import { IoGameController } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../features/VideosSlice";
import { fetchVideos } from "../youtube/FetchVideos";
import { useNavigate } from "react-router-dom";

const SideBar = ({ sidebar, setSidebar }) => {
  const date = new Date();
  const navigate = useNavigate();
  const category = useSelector((state) => state.categories.category);
  const dispatch = useDispatch();

  const getVideos = async () => {
    console.log(category);
    const data = await fetchVideos({ category });
    dispatch(setVideos(data));
  };

  const fetchYoutubeData = async (cate) => {
    navigate('/')
    dispatch(setCategory(cate));
  };

  useEffect(() => {
    getVideos();
  }, [category]);

  return (
    <div
      className={`z-50 absolute top-0 rounded-lg ${
        sidebar ? "bg-black/60 w-full" : "w-0"
      }`}
      onClick={() => setSidebar(false)}
    >
      <div
        className={`flex h-screen overflow-y-hidden hover:overflow-y-auto flex-col gap-4 w-80 bg-[#0F0F0F] p-4 transform ${
          sidebar ? "translate-x-0" : "-translate-x-84"
        } 
                  transition-transform duration-300 ease-in-out`}
      >
        <div className="flex gap-2 px-6 py-1 items-center">
          <div className="pr-4">
            <FaBars
              size={24}
              className="cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </div>
          <div className="flex justify-center items-center gap-1 cursor-pointer">
            <img src={logo} width={40} />
            <p className="font-youtube font-bold text-white text-2xl">
              OnceTube
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div
            onClick={() => fetchYoutubeData(0)}
            className={`flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300 ${
              category === 0 ? "bg-[#2a2a2a]" : ""
            }`}
          >
            <MdHome size={40} className="w-14" />
            <p className="text-xl">Home</p>
          </div>
          <div className="flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-3 rounded-xl px-2 transition-all duration-300">
            <MdVideoLibrary size={35} className="w-14" />
            <p className="text-xl">Subscriptions</p>
          </div>
        </div>

        <div className="w-full h-[3px] bg-[#2a2a2a]"></div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold pl-5 pb-2">You</div>
          <div className="flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300">
            <MdHistory size={35} className="w-14" />
            <p className="text-xl">History</p>
          </div>
          <div className="flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300">
            <MdOutlineWatchLater size={35} className="w-14" />
            <p className="text-xl">Watch Later</p>
          </div>
          <div className="flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300">
            <AiOutlineLike size={35} className="w-14" />
            <p className="text-xl">Liked Videos</p>
          </div>
        </div>

        <div className="w-full h-[3px] bg-[#2a2a2a]"></div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold pl-5 py-2">Subscriptions</div>
          <div className="flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-5 transition-all duration-300">
            <img src={tom} className="w-10 rounded-full" />
            <p className="text-xl">Sony Sab</p>
          </div>
          <div className="flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-5 transition-all duration-300">
            <img src={jack} className="w-10 rounded-full" />
            <p className="text-xl">Chai aur Code</p>
          </div>
        </div>

        <div className="w-full h-[3px] bg-[#2a2a2a]"></div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold pl-5 py-2">Explore</div>
          <div
            onClick={() => fetchYoutubeData(0)}
            className={`flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300 ${
              category === 1 ? "bg-[#2a2a2a]" : ""
            }`}
          >
            <MdWhatshot size={35} className="w-14" />
            <p className="text-xl">Trending</p>
          </div>
          <div
            onClick={() => fetchYoutubeData(22)}
            className={`flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300 ${
              category === 19 ? "bg-[#2a2a2a]" : ""
            }`}
          >
            <FiShoppingBag size={35} className="w-14" />
            <p className="text-xl">People & Vlogs</p>
          </div>
          <div
            onClick={() => fetchYoutubeData(10)}
            className={`flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300 ${
              category === 10 ? "bg-[#2a2a2a]" : ""
            }`}
          >
            <FiMusic size={35} className="w-14" />
            <p className="text-xl">Music</p>
          </div>
          <div
            onClick={() => fetchYoutubeData(20)}
            className={`flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300 ${
              category === 20 ? "bg-[#2a2a2a]" : ""
            }`}
          >
            <IoGameController size={35} className="w-14" />
            <p className="text-xl">Gaming</p>
          </div>
          <div
            onClick={() => fetchYoutubeData(25)}
            className={`flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300 ${
              category === 25 ? "bg-[#2a2a2a]" : ""
            }`}
          >
            <MdOutlineNewspaper size={35} className="w-14" />
            <p className="text-xl">News</p>
          </div>
          <div
            onClick={() => fetchYoutubeData(17)}
            className={`flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300 ${
              category === 17 ? "bg-[#2a2a2a]" : ""
            }`}
          >
            <IoMdTrophy size={35} className="w-14" />
            <p className="text-xl">Sports</p>
          </div>
          <div
            onClick={() => fetchYoutubeData(28)}
            className={`flex gap-4 items-center hover:bg-[#2a2a2a] cursor-pointer py-2 rounded-xl px-2 transition-all duration-300 ${
              category === 28 ? "bg-[#2a2a2a]" : ""
            }`}
          >
            <GiClothes size={35} className="w-14" />
            <p className="text-xl">Science & Technology</p>
          </div>
        </div>

        <div className="w-full h-[3px] bg-[#2a2a2a]"></div>

        <div className="flex flex-col gap-1">
          <div className="flex gap-6 items-center py-2 px-5">
            <a href="https://github.com/amit-prajapati-ap" target="_blank">
              <AiOutlineGithub size={35} className="cursor-pointer" />
            </a>

            <a href="https://www.linkedin.com/in/amit-prajapati-0544882b5/" target="_blank">
              <AiOutlineLinkedin size={35} className="cursor-pointer" />
            </a>

            <a href="https://x.com/Prajapatiamitap" target="_blank">
              <AiOutlineX size={35} className="cursor-pointer" />
            </a>
          </div>
          <div className="pl-5 hover:bg-[#2a2a2a] cursor-pointer py-2.5 my-1 rounded-xl px-5 transition-all duration-300 text-xl">
            Contact Us
          </div>
          <div className="pl-4">&copy; {date.getFullYear()} OnceTube Ltd.</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
