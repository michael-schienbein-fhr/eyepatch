// import './Youtube.css';
import YouTube from "react-youtube";
import { useState, useEffect, useRef } from "react";
import useDidMountEffect from '../hooks/useDidMountEffect';

const Video = ({ sendJsonMessage, globalPlaybackTime }) => {
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState("M7lc1UVf-VE")
  const [playbackTime, setPlaybackTime] = useState(null)
  const onReady = (e) => {
    console.log(`YouTube Player object for videoId: "${videoId}" has been saved to state.`);
    setPlayer(e.target);

    // console.debug(player.da)
    console.debug(player, 'THIS IS THE PLAYER');
  }
  // useEffect(() => {
  //   if (player !== null) {
  //     player.seekTo(globalPlaybackTime);
  //   };
  // }, [globalPlaybackTime])

  // useDidMountEffect(() => {
  //   // react please run me if 'key' changes, but not on initial render
  //   console.log("updated player target");
  // }, [player]);
  // if (videoUrl) {
  //   videoCode = videoUrl.split("v=")[1].split("&")[0];
  // }

  const [sequence, setSequence] = useState([]);
  const [timer, setTimer] = useState(null);
  const handleStateChange = (e) => handleEvent(e.data);
  const handlePlay = () => console.log("Play!");
  const handlePause = () => console.log("Pause!");
  const handleBuffer = () => console.log("Buffer!");
  const handleSeek = () => {
    console.log("Seek!")
    console.debug(globalPlaybackTime)
    setPlaybackTime(player.getCurrentTime());
    // globalPlaybackTime.current = playbackPosition;
    // console.log(globalPlaybackTime, playbackPosition);
    sendJsonMessage({ type: "time", time: playbackTime });
    console.debug(globalPlaybackTime, 'THIS IS THE PLAYER TIME');
    console.debug(playbackTime, 'this is the local time')
  };

  const isSubArrayEnd = (A, B) => {
    if (A.length < B.length)
      return false;
    let i = 0;
    while (i < B.length) {
      if (A[A.length - i - 1] !== B[B.length - i - 1])
        return false;
      i++;
    }
    return true;
  };

  const handleEvent = type => {
    // Update sequence with current state change event
    setSequence([...sequence, type]);
    if (type === 1 && isSubArrayEnd(sequence, [3]) && !sequence.includes(-1)) {
      handleSeek(); // Arrow keys seek
      setSequence([]); // Reset event sequence
    } else {
      clearTimeout(timer); // Cancel previous event
      if (type !== 3) { // If we're not buffering,
        let timeout = setTimeout(function () { // Start timer
          if (type === 1) handlePlay();
          else if (type === 2) handlePause();
          setSequence([]); // Reset event sequence
        }, 250);
        setTimer(timeout);
      }
    }
  };

  const onStateChange = (e) => {


    handleStateChange(e)
    // console.log(e.target.playerInfo);

    // e.target.pauseVideo();
    // console.log(currentTime);
    // playbackPosition.current = globalPlaybackTime;
    // console.debug(playbackPosition, "LOOK")
    // console.debug(player, 'THIS IS THE PLAYER');
    // console.debug(player.getPlayerState(), 'THIS IS THE PLAYER');
    


    // if (player.playerInfo.playerState === 3) {
    //   player.pauseVideo();
    //   player.playVideo();
    // };
    // console.debug(player,'THIS IS THE PLAYER');
    // setStateChange(stateChange === true ? false : true);
    // console.log(stateChange);
    // sendJsonMessage({ type: "videoId", videoId, action: "add" });
    // if (player !== null) {
    //       timer.current = setTimeout(() => {
    //         player.pauseVideo();
    //         // player.seekTo(globalPlaybackTime);
    //         // player.playVideo();
    //       }, 1000);
    //     }
    //     console.log('effect');
    //     return () => {
    //       clearTimeout(timer.current);
    //     };
    // e.target.seekTo(globalPlaybackTime);
    // const duration = e.target.getDuration();
  };
  // const sync = () => {
  //   // console.log('ready')
  // }
  const opts = {
    // height: '640',
    // width: '1137.78',
    height: '100',
    width: '200',
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