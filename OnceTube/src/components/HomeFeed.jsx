import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../features/VideosSlice";
import { API_KEY } from "../youtube/data";

const HomeFeed = () => {
  const [feed, setFeed] = useState([]);
  const videos = useSelector((state) => state.videos.videos);
  const [pageToken, setPageToken] = useState(null);

  const categoryId = useSelector((state) => state.categories.category);
  const dispatch = useDispatch();

  const getVideos = async () => {
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=IN&videoCategoryId=${
      categoryId ? categoryId : 0
    }&key=${API_KEY}`;

    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setPageToken((prev) => data.nextPageToken || prev);
    dispatch(setVideos([...feed, ...data.items]));
  };

  useEffect(() => {
    setFeed((prevFeed) => {
      if (prevFeed != videos) {
        return videos;
      }
      return prevFeed;
    });
  }, [videos]);
  
  useEffect(() => {
    getVideos();
  }, []);

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
    <div className="max-w-full max-h-[90vh] overflow-y-auto pr-5 pl-2 flex flex-col">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4 ">
        {feed?.map((video) => (
          <div
            key={video.id}
            className="max-w-[470px] h-[370px] 2xl:max-w-[370px] mt-2"
          >
            <Link
              to={`/video/${video.snippet.categoryId}/${video.id}`}
              className="relative cursor-pointer"
            >
              <img
                src={video.snippet.thumbnails.standard.url}
                className="rounded-md max-h-[250px] w-full"
              />
              <p className="bg-[#000000a6] absolute bottom-2 right-2 py-0.5 px-2 rounded-md">
                {convertISO8601Duration(video.contentDetails.duration)}
              </p>
            </Link>
            <div className="flex justify-start items-start gap-4 mt-2">
              <div className="w-full">
                <div className="flex gap-2 items-center justify-between w-full">
                  <h2 className="line-clamp-2 font-bold text-[#e2e2e2]">
                    {video.snippet.title}
                  </h2>
                  <div className="mb-4">
                    <BsThreeDotsVertical size={28} className="cursor-pointer" />
                  </div>
                </div>
                <h3 className="text-[#939292] transition-all duration-200 font-bold cursor-pointer hover:text-[#d8d8d8] flex items-center gap-1.5">
                  <p>{video.snippet.channelTitle}</p>
                  {checkVerifiedChannel(video.statistics.viewCount) ? (
                    <AiFillCheckCircle className="mb-[0.2px]" />
                  ) : (
                    ""
                  )}
                </h3>
                <p className="text-[#939292] font-bold">
                  {formatViews(video.statistics.viewCount)} &bull;{" "}
                  {timeAgo(video.snippet.publishedAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={getVideos}
        className="text-center text-2xl rounded-sm py-2 cursor-pointer px-10 my-2 bg-blue-600 max-w-[250px] mx-auto"
      >
        Show More
      </button>
    </div>
  );
};
export default HomeFeed;
