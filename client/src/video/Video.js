// import './Youtube.css';
import YouTube from "react-youtube";
import { useState, useEffect, useRef } from "react";



const Video = ({
  sendJsonMessage,
  globalPlaybackTime,
  globalPlayerState,
  globalQueue }) => {
  const [playbackTime, setPlaybackTime] = useState(null);
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState("M7lc1UVf-VE")
  const [sequence, setSequence] = useState([]);
  const [timer, setTimer] = useState(null);

  // useEffect(function () {
  //   if (player) {
  //     console.debug(selectedVideo.id.v)
  //     player.cueVideoById({
  //       videoId: selectedVideo.id.videoId,
  //       startSeconds: 0
  //     });
  //     // player.playVideo();
  //   };
  // }, [selectedVideo]);

  useEffect(function () {
    // console.debug("effect")
    console.debug('\nOther user has updated time and state\n', 'time:', globalPlaybackTime, 'state:', globalPlayerState);
    if (player) {
      if (globalPlayerState === 'play') {
        console.log("Play!");
        console.log(player.getPlayerState());
        player.playVideo();
      };
      if (globalPlayerState === 'pause') {
        console.log("Pause!");
        console.log(player.getPlayerState());
        // player.seekTo(globalPlaybackTime);
        player.pauseVideo();
      };
      if (globalPlayerState === 'seek') {
        console.log("Seek!");
        console.log(player.getPlayerState());
        player.seekTo(globalPlaybackTime);
      };
    };
  }, [globalPlaybackTime, globalPlayerState]);

  const onReady = (e) => {
    console.debug(`YouTube Player object has been saved to state.`);
    setPlayer(e.target);
  };

  const onStateChange = (e) => {
    setPlaybackTime(player.getCurrentTime());
    handleStateChange(e)
  };

  const handleStateChange = (e) => handleEvent(e);
  const handlePlay = () => {
    console.log("Play!");
    console.debug(playbackTime, 'Local user has updated time');
    sendJsonMessage({ type: "time", time: playbackTime });
    sendJsonMessage({ type: "playerState", state: "play" });
  };
  const handlePause = () => {
    console.log("Pause!");
    console.debug(playbackTime, 'Local user has updated time');
    sendJsonMessage({ type: "time", time: playbackTime });
    sendJsonMessage({ type: "playerState", state: "pause" });
  };
  const handleBuffer = () => console.log("Buffer!");
  const handleSeek = () => {
    console.log("Seek!");
    console.debug(playbackTime, 'Local user has updated time');
    sendJsonMessage({ type: "time", time: playbackTime });
    sendJsonMessage({ type: "playerState", state: "seek" });

  };
  const handleCue = () => {
    console.log('Cued!')
  }
  const handleEnd = () => {
    console.log('Ended!')
    console.log(globalQueue);
    setVideoId(globalQueue[0].videoId);
    // global
  }

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

  const handleEvent = (e) => {
    // Update sequence with current state change event
    if (e.data === 5) {
      handleCue()
    } else if (e.data === 0) {
      handleEnd()
    }
    setSequence([...sequence, e.data]);
    if (e.data === 1 && isSubArrayEnd(sequence, [3]) && !sequence.includes(-1)) {
      handleSeek(); // Arrow keys seek
      setSequence([]); // Reset event sequence
    } else {
      clearTimeout(timer); // Cancel previous event
      if (e.data !== 3) { // If we're not buffering,
        let timeout = setTimeout(function () { // Start timer
          if (e.data === 1) handlePlay();
          else if (e.data === 2) handlePause();
          setSequence([]); // Reset event sequence
        }, 250);
        setTimer(timeout);
      }
    }
  };

  const opts = {

    height: '200',
    width: '400',
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div>
      <YouTube
        videoId={videoId}
        containerClassName="Youtube"
        onStateChange={onStateChange}
        onReady={onReady}
        opts={opts}
      />
    </div>
  );
};

export default Video;