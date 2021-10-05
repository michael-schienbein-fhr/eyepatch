// import './Youtube.css';
// import YouTube from "react-youtube";
import ReactPlayer from 'react-player';
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
  const playerRef = useRef(null);

  // useEffect(function () {
  // console.debug("effect")
  //   console.debug('\nOther user has updated time and state\n', 'time:', globalPlaybackTime, 'state:', globalPlayerState);
  //   if (player) {
  //     if (globalPlayerState === 'play') {
  //       console.log("Play!");
  //       console.log(player.getPlayerState());
  //       // player.seekTo(globalPlaybackTime);
  //       player.playVideo();
  //     };
  //     if (globalPlayerState === 'pause') {
  //       console.log("Pause!");
  //       console.log(player.getPlayerState());
  //       // player.seekTo(globalPlaybackTime);
  //       player.pauseVideo();
  //     };
  //     if (globalPlayerState === 'seek') {
  //       console.log("Seek!");
  //       console.log(player.getPlayerState());
  //       player.seekTo(globalPlaybackTime);
  //       player.playVideo();
  //     };
  //   };
  // }, [globalPlayerState, globalPlaybackTime]);

  const onReady = (newPlayer) => {
    console.debug(`YouTube Player object has been saved to state.`);
    // setPlayer(newPlayer);
    setPlayer(newPlayer.getInternalPlayer());
    console.debug(newPlayer);
    // console.debug(playerRef.current.player.player.onStateChange(() => { console.log('hello') }));
  };

  const onStateChange = (e) => {
    // console.debug(getSecondsLoaded());
    console.debug(player);
    setPlaybackTime(player.getCurrentTime());
    // handleStateChange(e)
  };

  // const handlePlay = () => {
  //   console.log("Play!");
  //   setPlaybackTime(player.getCurrentTime());
  //   console.debug(playbackTime, 'Local user has updated time');
  //   // sendJsonMessage({ type: "time", time: playbackTime });
  //   sendJsonMessage({ type: "playerState", state: "play", time: playbackTime });
  // };
  // const handlePause = () => {
  //   console.log("Pause!");
  //   setPlaybackTime(player.getCurrentTime());
  //   console.debug(playbackTime, 'Local user has updated time');
  //   // sendJsonMessage({ type: "time", time: playbackTime });
  //   sendJsonMessage({ type: "playerState", state: "pause", time: playbackTime });
  // };
  // const handleSeek = () => {
  //   console.log("Seek!");
  //   setPlaybackTime(player.getCurrentTime());
  //   console.debug(playbackTime, 'Local user has updated time');
  //   // sendJsonMessage({ type: "time", time: playbackTime });
  //   sendJsonMessage({ type: "playerState", state: "seek", time: playbackTime });

  // };
  // const handleBuffer = () => console.log("Buffer!");
  // const handleBufferEnd = () => console.log("Buffer END!");
  const handleProgress = () => {
    console.log("progresssss")
    setPlaybackTime(player.getCurrentTime());
  };
  // const handleCue = () => {
  //   console.log('Cued!')
  // }
  // const handleEnd = () => {
  //   console.log('Ended!')
  //   console.log(globalQueue);
  //   setVideoId(globalQueue[0].videoId);


  // }
  // const onStateChange = () => {
  //   console.log('a thing')
  // };
  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        className='react-player'
        width='100%'
        height='100%'
        url={`https://www.youtube.com/watch?v=${videoId}`}
        // pip={pip}
        playing={true}
        // seekOnPlay={true}
        // playing={playing}
        controls={true}
        // controls={controls}
        // light={light}
        // loop={loop}
        // playbackRate={playbackRate}
        // volume={volume}
        // muted={muted}
        onReady={onReady}
        onStart={() => console.log('onStart')}
        // onPlay={handlePlay}
        // onPause={handlePause}
        // onBuffer={handleBuffer}
        // onBufferEnd={handleBufferEnd}
        onSeek={e => console.log('onSeek', e)}
        // onSeek={handleSeek}
        // onEnded={handleEnd}
        onError={e => console.log('onError', e)}
        onProgress={handleProgress}
        onStateChange={onStateChange}
        // onDuration={this.handleDuration}
        // onEnablePIP={this.handleEnablePIP}
        // onDisablePIP={this.handleDisablePIP}
        config={{
          youtube: {
            playerVars: {
              showinfo: 1,
            }
          }
        }}
      />
    </div>
  );
};

export default Video;