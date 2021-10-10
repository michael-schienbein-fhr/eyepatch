import React from 'react';
import './video-item.css';

const VideoItem = ({ video, handleVideoRemoval, handleVideoChange }) => {
  return (
    <>
      <div onClick={() => handleVideoRemoval(video)}>X</div>
      <div onClick={() => handleVideoChange(video)} className='video-item item'>
        <img className='image' src={video.thumbnail} alt={video.description} />
        {/* <div className='content'>
          <div className='header '>{video.title}</div>
        </div> */}
      </div>
    </>
  )
};
export default VideoItem;