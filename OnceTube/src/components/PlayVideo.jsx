import React, { useEffect, useState } from "react";
import jack from "../assets/jack.png";
import { AiFillLike, AiFillDislike, AiFillCheckCircle } from "react-icons/ai";
import { BsShare, BsBookmark } from "react-icons/bs";
import { API_KEY } from "../youtube/data";

const PlayVideo = ({ videoId }) => {
  const [showMore, setShowMore] = useState(false);
  const [showMoreComment, setShowMoreComment] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchChannelData = async () => {
    const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelUrl)
      .then((response) => response.json())
      .then((data) => setChannelData(data.items[0]));

    const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&order=relevance&videoId=${videoId}&key=${API_KEY}`;
    await fetch(commentUrl)
      .then((response) => response.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, []);

  useEffect(() => {
    fetchChannelData();
  }, [apiData]);

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
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1_000 && num < 1_000_00) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    } else if (num >= 1_000_00) {
      return (num / 1_000).toFixed(0).replace(/\.0$/, "") + "K";
    } else {
      return num;
    }
  }

  function convertISO8601Duration(duration) {
    const match = duration.match(/PT(\d+M)?(\d+S)?/);
    const minutes = match[1] ? parseInt(match[1]) : 0;
    const seconds = match[2] ? parseInt(match[2]) : 0;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="flex flex-col gap-6 m-2 h-[90vh] text-[#ededed]">
      <div className="flex justify-center bg-black">
        <iframe
          className="w-full h-[600px]"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <h2 className="text-2xl font-bold mx-6 w-[60vw]">
        {apiData?.snippet.title}
      </h2>

      <div className="flex justify-between items-center mx-6 w-[60vw]">
        <div className="flex gap-3 max-w-[40%]">
          <img
            src={channelData?.snippet.thumbnails.default.url}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <div>
              <h3 className="text-xl font-bold line-clamp-1">
                {apiData?.snippet.channelTitle}
              </h3>
            </div>
            <p className="text-[#c2c2c2] line-clamp-1">
              {formatViews(channelData?.statistics.subscriberCount)} subscribers
            </p>
          </div>
          <button className="bg-[#ededed] text-black px-6 cursor-pointer hover:bg-[#d8d8d8] transition-all duration-200 rounded-full my-1 text-lg font-[600] ml-6">
            Subscribe
          </button>
        </div>

        <div className="flex gap-3 mt-2">
          <div className="flex rounded-full bg-[#2b2b2bc8]">
            {/* Like Button */}
            <div className="p-2 hover:bg-[#333] transition-all duration-200 rounded-l-full cursor-pointer">
              <button className="flex items-center px-4 py-1 rounded-full text-white text-sm font-semibold gap-2 cursor-pointer">
                <AiFillLike size={27} />
                <p className="text-xl">
                  {formatViews(apiData?.statistics.likeCount)}
                </p>
              </button>
            </div>

            <div className=" my-2 w-[3px] bg-[#575757]"></div>

            {/* Dislike Button */}
            <div className="p-2 hover:bg-[#333] transition-all duration-200 rounded-r-full cursor-pointer">
              <button className="flex items-center px-4 py-1 rounded-full text-white text-sm font-semibold gap-2 cursor-pointer">
                <AiFillDislike size={27} />
              </button>
            </div>
          </div>

          {/* Share Button */}
          <button className="flex items-center bg-[#2b2b2bc8] px-5 py-1 rounded-full text-white text-lg font-semibold gap-2 cursor-pointer hover:bg-[#333] transition-all duration-200">
            <BsShare size={24} />
            Share
          </button>

          {/* Save Button */}
          <button className="flex items-center bg-[#2b2b2bc8] px-6 py-1 rounded-full text-white text-lg font-semibold gap-2 cursor-pointer hover:bg-[#333] transition-all duration-200">
            <BsBookmark size={24} />
            Save
          </button>
        </div>
      </div>

      <div className="flex items-start gap-1 flex-col mx-6 rounded-xl bg-[#2a2a2add] py-3 px-5 w-[60vw]">
        <p className="font-[600] text-xl">
          {formatViews(apiData?.statistics.viewCount)} views{" "}
          {timeAgo(apiData?.snippet.publishedAt)}
        </p>
        <h2 className="text-xl font-[400]">{apiData?.snippet.title}</h2>
        <div className="w-[700px]">
          {showMore && apiData?.snippet.description}
        </div>
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="text-xl font-[400] cursor-pointer"
        >
          {showMore ? "Show Less" : "...more"}
        </button>
      </div>

      <div className="flex flex-col gap-6 mx-6 w-[60vw]">
        <h2 className="font-bold text-2xl">
          {formatViews(apiData?.statistics.commentCount)} Comments
        </h2>
        {/* Cards */}
        <div className="flex flex-col gap-7 ">
          {commentData?.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <img
                src={
                  comment.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                className="w-12 h-12 mt-1 rounded-full"
              />
              <div className="flex flex-col">
                <div className="flex gap-2 items-end">
                  <h3 className="font-bold text-lg">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </h3>
                  <p className="text-[#a5a5a5] font-[500]">
                    {timeAgo(comment.snippet.topLevelComment.snippet.updatedAt)}
                  </p>
                </div>

                <div>
                  <p
                    className={`font-[500] ${
                      !showMoreComment ? "line-clamp-4" : ""
                    } leading-6 text-[17px]`}
                  >
                    {comment.snippet.topLevelComment.snippet.textOriginal}
                  </p>
                  <div onClick={() => {setShowMoreComment(prev => !prev)}} className="cursor-pointer text-lg">
                    {comment.snippet.topLevelComment.snippet.textOriginal.length > 400 ? showMoreComment ? <p>Show Less</p> : <p>Show More</p> : ''}
                  </div>
                </div>

                <div className="flex mt-2 items-center gap-6 text-[#8d8d8d]">
                  <div className="flex items-center gap-1">
                    <AiFillLike size={25} className="cursor-pointer" />
                    <p>
                      {formatViews(
                        comment.snippet.topLevelComment.snippet.likeCount
                      )}
                    </p>
                  </div>
                  <AiFillDislike size={25} className="cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
