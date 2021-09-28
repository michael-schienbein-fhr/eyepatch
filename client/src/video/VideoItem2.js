import React from 'react';
import './video-item.css';

const VideoItem = ({ video, handleVideoRemoval }) => {
  // console.log(video);
  return (
    <div onClick={() => handleVideoRemoval(video)} className=' video-item item'>
      <img className='ui image' src={video.thumbnail} alt={video.description} />
      <div className='content'>
        <div className='header '>{video.title}</div>
      </div>
    </div>
  )
};
export default VideoItem;