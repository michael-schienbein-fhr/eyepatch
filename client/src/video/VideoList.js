import React from 'react';
import VideoItem from './VideoItem';
import VideoItem2 from './VideoItem2';

const VideoList = ({ videoSearchRes, globalQueue, handleVideoQueing, handleVideoRemoval }) => {
    const renderedVideos = (videoSearchRes.length > 0)
        ? videoSearchRes.map((video) => {
            return <VideoItem key={video.id.videoId} video={video} handleVideoQueing={handleVideoQueing} />
        })
        : globalQueue.map((video) => {
            return <VideoItem2 key={video.videoId} video={video} handleVideoRemoval={handleVideoRemoval} />
        });

    return <div className='ui relaxed divided list'>{renderedVideos}</div>;
};
export default VideoList;