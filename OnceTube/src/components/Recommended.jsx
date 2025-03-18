import React, { useEffect, useState } from "react";
import thumbnail1 from "../assets/thumbnail1.png";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { fetchVideos } from "../youtube/FetchVideos";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  const fetchRecommendedVideos = async () => {
    const data = await fetchVideos({ category: categoryId });
    setRecommendedVideos(data);
  };

  useEffect(() => {
    fetchRecommendedVideos();
  }, []);
  console.log(recommendedVideos);

  function timeAgo(publishedAt) {
    const publishedDate = new Date(publishedAt);
    const now = new Date();
    const seconds = Math.floor((now - publishedDate) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let unit in intervals) {
      const interval = Math.floor(seconds / intervals[unit]);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  }

  function formatViews(viewCount) {
    const num = parseInt(viewCount, 10);

    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B views";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M views";
    } else if (num >= 1_000 && num < 1_000_00) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K views";
    } else if (num >= 1_000_00) {
      return (num / 1_000).toFixed(0).replace(/\.0$/, "") + "K views";
    } else {
      return num + " views";
    }
  }

  function checkVerifiedChannel(viewCount) {
    const num = parseInt(viewCount, 10);

    if (num >= 1_000_00) {
      return true;
    } else {
      return false;
    }
  }

  function convertISO8601Duration(duration) {
    const match = duration.match(/PT(\d+M)?(\d+S)?/);
    const minutes = match[1] ? parseInt(match[1]) : 0;
    const seconds = match[2] ? parseInt(match[2]) : 0;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="flex cursor-pointer flex-col gap-4 max-w-[1800px] mr-4 my-2">
      {/* Cards */}
      {recommendedVideos?.map((videos) => (
        <div key={videos.id} className="flex gap-3 h-30 relative">
          <Link
            to={`/video/${videos.snippet.categoryId}/${videos.id}`}
            className="relative"
          >
            <img
              src={videos.snippet.thumbnails.default.url}
              className="h-full min-w-[200px] rounded-md"
            />
            <p className="bg-[#000000a6] absolute bottom-2 right-2 py-0.5 px-2 rounded-md">
              {convertISO8601Duration(videos.contentDetails.duration)}
            </p>
          </Link>

          <div>
            <h2 className="text-xl font-[500] line-clamp-2 mr-10 ">
              {videos.snippet.title}
            </h2>
            <h3 className="text-[#939292] transition-all duration-200 font-[500] hover:text-[#d8d8d8] flex items-center gap-1.5">
              <p>{videos.snippet.channelTitle}</p>
              {checkVerifiedChannel(videos.statistics.viewCount) ? (
                <AiFillCheckCircle className="mb-[0.2px]" />
              ) : (
                ""
              )}
            </h3>
            <p className="text-[#939292] font-[500]">
              {formatViews(videos.statistics.viewCount)} &bull;{" "}
              {timeAgo(videos.snippet.publishedAt)}
            </p>
            <p className="px-1 rounded-sm text-sm w-9 bg-[#2d2d2d] text-[#989898]">
              New
            </p>
          </div>
          <BsThreeDotsVertical
            size={26}
            className="cursor-pointer absolute right-0"
          />
        </div>
      ))}

      {/* Show More */}
      <button className="border border-[#464646] rounded-full py-2 font-[500] text-lg text-blue-400 cursor-pointer hover:bg-[rgba(78,84,170,0.3)] transition-all duration-300">
        Show more
      </button>
    </div>
  );
};

export default Recommended;
