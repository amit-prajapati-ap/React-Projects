import React from 'react'
import PlayVideo from '../components/PlayVideo'
import Recommended from '../components/Recommended'
import { useParams } from 'react-router-dom'

const VideoPage = () => {
  const {videoId, categoryId} = useParams();
  return (
    <div className='h-[94vh] w-full flex gap-2 overflow-y-auto'>
      <PlayVideo videoId={videoId}/>
      <Recommended categoryId={categoryId}/>
    </div>
  )
}

export default VideoPage
