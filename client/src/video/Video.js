// import './Youtube.css';
import YouTube from "react-youtube";
import { useState, useEffect, useRef } from "react";



const Video = ({
  sendJsonMessage,
  globalPlaybackTime,
  globalPlayerState,
  globalQueue,
  globalVideoId,
  handleVideoChange
}) => {
  const [playbackTime, setPlaybackTime] = useState(null);
  const [player, setPlayer] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [timer, setTimer] = useState(null);
  const playerRef = useRef(null);
  const interval = useRef(null);
  let prevPlayed;
  let prevLoaded;

  useEffect(function () {
    console.log(globalQueue);
    console.log(globalVideoId);
    console.log(globalPlaybackTime)
    setCurrentVideoId(globalVideoId);
    // sendJsonMessage({ type: "playerState", who: 'self', state: "seek", time: globalPlaybackTime, videoId: currentVideoId });
  }, [player])

  useEffect(function () {
    if (player && globalVideoId !== currentVideoId) {
      setCurrentVideoId(globalVideoId);
    };
  }, [globalVideoId, currentVideoId]);

  useEffect(function () {
    if (player) {
      if (globalPlayerState === 'play') {
        console.log("Play!");
        player.playVideo();
      };
      if (globalPlayerState === 'pause') {
        console.log("Pause!");
        player.pauseVideo();
      };
      if (globalPlayerState === 'seek') {
        console.log("Seek!");
        player.seekTo(globalPlaybackTime);
      };
    };
  }, [globalPlaybackTime, globalPlayerState]);

  const onProgress = (who) => {
    if (player) {
      let playedSeconds = player.getCurrentTime() || 0;
      let loadedSeconds = getSecondsLoaded();
      let duration = player.getDuration();

      if (duration) {
        let progress = {
          playedSeconds: playedSeconds,
          played: playedSeconds / duration
        };
        if (loadedSeconds !== null) {
          progress.loadedSeconds = loadedSeconds;
          progress.loaded = loadedSeconds / duration;
        }

        if (progress.playedSeconds !== prevPlayed || progress.loadedSeconds !== prevLoaded) {
          console.log(progress);
          sendJsonMessage({ type: "playerState", who, state: "seek", time: playedSeconds, videoId: currentVideoId });
        };

        prevPlayed = progress.playedSeconds;
        prevLoaded = progress.loadedSeconds;
      };
    };
  };
  const getSecondsLoaded = () => {
    return player.getVideoLoadedFraction() * player.getDuration();
  };

  const onReady = (e) => {
    setPlayer(e.target);
  };

  const handleStateChange = (e) => handleEvent(e);
  const handlePlay = () => {
    console.log("Play!");
    clearInterval(interval.current);
    sendJsonMessage({ type: "playerState", who: 'exclusive', state: "play", time: playbackTime, videoId: currentVideoId });
  };
  const handlePause = () => {
    console.log("Pause!");
    interval.current = setInterval(onProgress('exclusive'), 500);
    sendJsonMessage({ type: "playerState", who: 'exclusive', state: "pause", time: playbackTime, videoId: currentVideoId });
  };
  const handleSeek = () => {
    console.log("Seek!");
    clearInterval(interval.current);
    sendJsonMessage({ type: "playerState", who: 'exclusive', state: "seek", time: playbackTime, videoId: currentVideoId });
  };
  const handleCue = () => {
    console.log('Cued!')
  };
  const handleEnd = () => {
    console.log('Ended!')
    if (globalQueue.length > 0) {
      for (let i = 0; i < globalQueue.length; i++) {
        if (globalQueue[i + 1] && globalQueue[i].videoId === currentVideoId) {
          handleVideoChange(globalQueue[i + 1]);
        };
      };
    };
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

  const handleEvent = (e) => {
    setPlaybackTime(player.getCurrentTime());
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
        ref={playerRef}
        videoId={currentVideoId}
        containerClassName="Youtube"
        onStateChange={e => handleStateChange(e)}
        onReady={onReady}
        opts={opts}
      />
    </div>
  );
};

export default Video;