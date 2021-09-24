// import './Youtube.css';
import YouTube from "react-youtube";
import { useState, useEffect, useRef } from "react";
import useDidMountEffect from '../hooks/useDidMountEffect';

const Video = ({ sendJsonMessage, globalPlaybackTime }) => {
  const [playbackPosition, setPlaybackPosition] = useState(null);
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState("M7lc1UVf-VE")
  const [stateChange, setStateChange] = useState(false);
  const timer = useRef(null);
  const onReady = (e) => {
    console.log(`YouTube Player object for videoId: "${videoId}" has been saved to state.`);
    setPlayer(e.target);

    console.log(player);
  }
  // useEffect(() => {
  //   if (player !== null) {
  //     timer.current = setTimeout(() => {

  //       player.seekTo(globalPlaybackTime);
  //     }, 500);
  //   }
  //   console.log('effect');
  //   return () => {
  //     clearTimeout(timer.current);
  //   };
  // }, [globalPlaybackTime])

  useDidMountEffect(() => {
    // react please run me if 'key' changes, but not on initial render
    console.log("updated player target");
  }, [player]);
  // if (videoUrl) {
  //   videoCode = videoUrl.split("v=")[1].split("&")[0];
  // }

  const onStateChange = (e) => {
    // console.log(e.target.playerInfo);

    // e.target.pauseVideo();
    // const currentTime = e.target.getCurrentTime();
    // console.log(currentTime);
    setPlaybackPosition(e.target.getCurrentTime());
    // setStateChange(stateChange === true ? false : true);
    console.log(stateChange);
    sendJsonMessage({ type: "video", time: playbackPosition });
    // e.target.seekTo(globalPlaybackTime);
    // const duration = e.target.getDuration();
  };
  // const sync = () => {
  //   // console.log('ready')
  // }
  const opts = {
    height: '640',
    width: '1137.78',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div>
      {/* <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} /> */}
      <YouTube
        videoId={videoId}
        containerClassName="Youtube"
        onStateChange={onStateChange}
        onReady={onReady}
        opts={opts}
      />
      {/* <button onClick={sync}>SYNC</button> */}
    </div>
  );
};

export default Video;