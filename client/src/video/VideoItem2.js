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

{/* <div class="container">
  <div href="#" class="like-button" title="Like Button">
    <i class="fa fa-heart fa-1x"></i>
  </div>
  <img src="https://staticvideos.pexels.com/videos/1448735/pictures/preview-0.jpg" alt="Beautiful Image" class="image">
  <div class ="overlay">
    <button href="#" class ="play-icon" title="Video Play">
    <i class ="fa fa-play"></i>
  </button>
  </div>
</div> */}