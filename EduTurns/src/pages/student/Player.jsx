import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { calculateChapterTime, calculateRating } from "../../utilityFunctions";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Loading from "../../components/student/Loading";
import Rating from "../../components/student/Rating";

const Player = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const allCourses = useSelector(
    (state) => state.appContext.appData.allCourses
  );
  let courseRating = null;

  if (courseData) {
    courseRating = calculateRating(courseData?.courseRatings);
  }

  const fetchCourseData = async () => {
    setCourseData(allCourses.find((course) => course._id === courseId));
  };

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  return courseData ? (
    <div className="min-h-[80vh] p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
      {/* Left Column */}
      <div className="text-gray-800">
        <h2 className="font-semibold text-xl">Course Structure</h2>
        <div className="pt-5">
          {courseData.courseContent.map((chapter, index) => (
            <div
              className="border border-gray-300 bg-white mb-2 rounded"
              key={index}
            >
              <div
                onClick={() => toggleSection(index)}
                className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={assets.down_arrow_icon}
                    className={`transform transition-transform ${
                      openSection[index] ? "rotate-180" : ""
                    }`}
                  />
                  <p className="font-medium md:text-base text-sm">
                    {chapter.chapterTitle}
                  </p>
                </div>
                <p className="text-sm md:text-medium">
                  {chapter.chapterContent.length} lectures -{" "}
                  {calculateChapterTime(chapter)}
                </p>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSection[index] ? "max-h-96" : "max-h-0"
                }`}
              >
                <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                  {chapter.chapterContent.map((lecture, i) => (
                    <li key={i} className="flex items-start gap-2 py-1">
                      <img
                        src={false ? assets.blue_tick_icon : assets.play_icon}
                        className="w-4 h-4 mt-1"
                      />
                      <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                        <p className="mt-1">{lecture.lectureTitle}</p>
                        <div className="flex gap-1">
                          {lecture.lectureUrl && (
                            <p
                              onClick={() =>
                                setPlayerData({
                                  ...lecture,
                                  chapter: index + 1,
                                  lecture: i + 1,
                                })
                              }
                              className="text-blue-500 cursor-pointer hover:underline"
                            >
                              Watch
                            </p>
                          )}
                          <p>
                            {humanizeDuration(
                              lecture.lectureDuration * 60 * 1000,
                              { units: ["h", "m"] }
                            )}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 py-3 mt-10">
          <h1 className="text-xl font-bold">Rate this Course:</h1>
        <Rating initialRating={0}/>
        </div>
      </div>

      {/* Right Column */}
      <div>
        {playerData ? (
          <div className="md:mt-10">
            <YouTube
              videoId={playerData.lectureUrl.split('/').pop()}
              iframeClassName="w-full aspect-video"
            />
            <div className="flex justify-between items-center mt-1">
              <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
              <button className="text-blue-600 cursor-pointer">{false ? 'Completed' : 'Mark Complete'}</button>
            </div>
          </div>
        ) : (
          <img src={courseData.courseThumbnail} />
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Player;
