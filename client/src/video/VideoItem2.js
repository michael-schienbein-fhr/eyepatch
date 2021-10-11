import React from 'react';
import './video-item.css';

const VideoItem = ({ video, handleVideoRemoval, handleVideoChange }) => {
  return (
    <>
      <div class='video-item-container'>
        <div href="#" class="like-button" title="Like Button">
          <i class="fa fa-heart fa-1x"></i>
        </div>
        <div onClick={() => handleVideoChange(video)} className='video-item item'>
          <div class="video-item-remove" onClick={() => handleVideoRemoval(video)}>X</div>
          <img className='image' src={video.thumbnail} alt={video.description} />
        </div>
      </div>
    </>
  )
};
export default VideoItem;
