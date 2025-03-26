import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { calculateCourseDuration } from '../../utilityFunctions/calculateCourseDuration'
import { useNavigate } from 'react-router-dom'
import {Line} from 'rc-progress'

const MyEnrollments = () => {
  const enrolledCourses = useSelector((state) => state.appContext.appData.enrolledCourses)
  const [progressArray, setProgressArray] = useState([
    {lectureCompleted: 2, totalLecture: 4},
    {lectureCompleted: 1, totalLecture: 5},
    {lectureCompleted: 6, totalLecture: 6},
    {lectureCompleted: 4, totalLecture: 4},
    {lectureCompleted: 0, totalLecture: 3},
    {lectureCompleted: 5, totalLecture: 7},
    {lectureCompleted: 8, totalLecture: 8},
    {lectureCompleted: 2, totalLecture: 6},
  ])
  const navigate = useNavigate()

  const checkLectureCompleted = (index) => {
    return progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLecture === 1;
  }

  return (
    <div className='md:px-36 px-8 pt-10'>
      <h1 className='text-2xl font-semibold'>My Enrollments</h1>
      <table className='md:table-auto table-fixed w-full overflow-hidden border border-gray-500/20 mt-10'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
          <tr>
            <th className='px-4 py-3 font-semibold truncate'>Course</th>
            <th className='px-4 py-3 font-semibold truncate'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate'>Completed</th>
            <th className='px-4 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>

        <tbody className='text-gray-700'>
          {enrolledCourses.map((course, index) => (
            <tr className='border-b border-gray-500/20' key={index}>
              <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                <img src={course.courseThumbnail} className='w-14 sm:w-24
                 md:w-28' />
                 <div className='flex-1'>
                  <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                  <Line strokeWidth={2} percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLecture : 0} className='bg-gray-300 rounded-full' />
                 </div>
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {calculateCourseDuration(course)}
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLecture}`} <span>Lectures</span>
              </td>
              <td className='px-4 py-3 max-sm:text-right'>
                <button onClick={() => navigate('/player/' + course._id)} className={`px-3 w-30 sm:px-5 py-1.5 sm:py-2  ${checkLectureCompleted(index) ? 'bg-green-500' : 'bg-yellow-500/80'} rounded-sm cursor-pointer max-sm:text-xs text-white`}>
                {checkLectureCompleted(index) ? 'Completed' : 'On Going'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyEnrollments
