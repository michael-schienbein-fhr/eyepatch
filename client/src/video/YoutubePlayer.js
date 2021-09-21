import YouTube from "react-youtube";
// import "./styles.css";

// Render function for Prismic headless CMS pages
const YoutubePlayer = () => {
  let videoCode = "M7lc1UVf-VE"
  // if (videoUrl) {
  //   videoCode = videoUrl.split("v=")[1].split("&")[0];
  // }

  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    console.log(currentTime, duration);
  };

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };


  return (
    <div>
      <div>
        <h1>Video</h1>
        <div></div>
      </div>
      <div>
        {/* <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} /> */}
        <div>
          <YouTube
            videoId={videoCode}
            containerClassName="embed embed-youtube"
            onStateChange={(e) => checkElapsedTime(e)}
            opts={opts}
          />
        </div>
      </div>


    </div>
  );
}

export default YoutubePlayer;