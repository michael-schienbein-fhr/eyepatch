// import './Youtube.css';
import YouTube from "react-youtube";
import { useState, useEffect, useRef } from "react";



const Video = ({ sendJsonMessage, globalPlaybackTime }) => {
  const [playbackTime, setPlaybackTime] = useState(null);
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState("M7lc1UVf-VE")
  const [sequence, setSequence] = useState([]);
  const [timer, setTimer] = useState(null);

  useEffect(function () {
    console.debug(globalPlaybackTime,'Other user has updated time')
  }, [globalPlaybackTime]);

  const onReady = (e) => {
    console.debug(`YouTube Player object has been saved to state.`);
    setPlayer(e.target);
  };

  const onStateChange = (e) => {
    setPlaybackTime(player.getCurrentTime());

    handleStateChange(e)
  };

  const handleStateChange = (e) => handleEvent(e);
  const handlePlay = () => console.log("Play!");
  const handlePause = () => console.log("Pause!");
  const handleBuffer = () => console.log("Buffer!");
  const handleSeek = () => {
    console.log("Seek!")
    // console.debug(player, 'Player object');
    console.debug(playbackTime, 'Local user has updated time');
    sendJsonMessage({ type: "time", time: playbackTime });

    // player.seekTo(globalPlaybackTime);
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
    // Update sequence with current state change event
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