import React from 'react';
import './video-item.css';

const VideoItem = ({ video, handleVideoQueing }) => {
    return (
            <div onClick={() => handleVideoQueing(video)} className=' video-item item'>
                <img className='image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description} />
            </div>
    )
};
export default VideoItem;

// add video title on hover