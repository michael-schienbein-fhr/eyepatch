// import './Youtube.css';
import YouTube from "react-youtube";
import { useState, useEffect, useRef } from "react";



const Video = ({
  sendJsonMessage,
  globalPlaybackTime,
  globalPlayerState,
  setGlobalPlayerState,
  globalQueue,
  globalVideoId,
  joinSyncTime,
  handleVideoChange
}) => {
  const [playbackTime, setPlaybackTime] = useState(null);
  const [player, setPlayer] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [timer, setTimer] = useState(null);
  const [timeoutBool, setTimeoutBool] = useState(false);
  const playerRef = useRef(null);
  const interval = useRef(null);
  const timeout = useRef(null);
  let prevPlayed;
  let prevLoaded;

  const handleSync = (time) => {
    handleSeek('self', time, 'seek');
  };
  useEffect(function () {
    clearInterval(interval.current);
    clearTimeout(timeout.current);
    if (player) {
      setTimeout(() => handleSync(joinSyncTime), 1000)
    }
  }, [player])
  useEffect(function () {
    if (player && globalVideoId !== currentVideoId) {
      setCurrentVideoId(globalVideoId);
    };
  }, [globalVideoId, player]);

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

  const onProgress = (timeoutBool = false) => {
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
          if (!timeoutBool) {
            sendJsonMessage({ type: "playerState", who: 'exclusive', state: "seek", time: playedSeconds, videoId: currentVideoId });
          } else if (timeoutBool) {
            sendJsonMessage({ type: "playerState", state: "sync", time: playedSeconds});
          }
        };

        prevPlayed = progress.playedSeconds;
        prevLoaded = progress.loadedSeconds;
      };
    };
    if (timeoutBool) {
      timeout.current = setTimeout(() => onProgress(true), 500);
    }
  };

  const getSecondsLoaded = () => {
    return player.getVideoLoadedFraction() * player.getDuration();
  };

  const onReady = (e) => {
    setPlayer(e.target);
  };

  const handleStateChange = (e) => handleEvent(e);
  const handlePlay = () => {
    clearInterval(interval.current);
    clearTimeout(timeout.current);
    onProgress(true);
    sendJsonMessage({ type: "playerState", who: 'exclusive', state: "play", time: playbackTime, videoId: currentVideoId });
  };
  const handlePause = () => {
    clearInterval(interval.current)
    clearTimeout(timeout.current);
    interval.current = setInterval(() => onProgress(false), 500);
    sendJsonMessage({ type: "playerState", who: 'exclusive', state: "pause", time: playbackTime, videoId: currentVideoId });
  };
  const handleSeek = (who, time, state) => {
    clearInterval(interval.current);
    // clearTimeout(timeout.current);
    // onProgress(true);
    sendJsonMessage({ type: "playerState", who: who, state: state, time: time, videoId: currentVideoId });
  };
  const handleEnd = () => {
    clearInterval(interval.current);
    clearTimeout(timeout.current);
    if (globalQueue.length > 0) {
      for (let i = 0; i < globalQueue.length; i++) {
        if (globalQueue[i + 1] && globalQueue[i].videoId === currentVideoId) {
          handleVideoChange(globalQueue[i + 1]);
        };
      };
    };
  };
  const handleCue = () => {
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
      handleSeek('exclusive', playbackTime, 'seek'); // Arrow keys seek
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
  // let autoplayBool = currentVideoId === null ? 0 : 1;
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