import './Room.css';
import { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Chat from '../chat/Chat';
import Video from '../video/Video';
import VideoList from '../video/VideoList';
import UserContext from "../auth/UserContext";
import SearchForm from '../common/SearchForm';
import youtube from '../api/youtube';

const WEBSOCKET_BASE = (process.env.NODE_ENV === "test")
  ? "ws://192.168.1.40:8001"
  : "ws://localhost:8001" //put heroku here

const Room = () => {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  const [videoSearchRes, setVideoSearchRes] = useState([]);
  const [globalQueue, setGlobalQueue] = useState([])
  const [globalPlaybackTime, setGlobalPlaybackTime] = useState(null);
  const [globalPlayerState, setGlobalPlayerState] = useState(null);
  const [globalVideoId, setGlobalVideoId] = useState(null);
  const [joinSyncTime, setJoinSyncTime] = useState(null);
  // const [playerIds, setPlayerIds] = useState([]);
  const [roomMembers, setRoomMembers] = useState([]);
  useEffect(function changeUsername() {
    setUsername(currentUser.username);
  }, []);

  const wsURL = `${WEBSOCKET_BASE}/room/${id}`;

  const onOpen = () => {
    console.log('opened');
    sendJsonMessage({ type: "join", username })
  };

  const onMessage = (e) => {
    const message = JSON.parse(e.data);
    if (message.type === 'chat') {
      setMessages((_messages) => [..._messages, message]);
    } else if (message.type === 'playerState' && message.state !== 'sync') {
      setGlobalPlayerState(message.state);
      setGlobalPlaybackTime(message.time);
    } else if (message.type === 'video' && message.action === 'add') {
      setGlobalQueue((_videos) => [..._videos, message]);
    } else if (message.type === 'video' && message.action === 'remove') {
      setGlobalQueue(globalQueue.filter(video => video.videoId !== message.videoId));
    } else if (message.type === 'video' && message.action === 'change') {
      setGlobalVideoId(message.videoId);
      setGlobalPlaybackTime(message.time);
      setGlobalPlayerState(null);
      setGlobalPlayerState("seek");
    } else if (message.type === 'video' && message.action === 'sync') {
      setJoinSyncTime(message.time);
    } else if (message.type === 'members') {
      setRoomMembers((_members) => [..._members, message.roomMember]);
    }
  };

  const {
    sendJsonMessage,
    readyState,
    // sendMessage,
    // lastMessage,
    // lastJsonMessage,
    // getWebSocket
  } = useWebSocket(wsURL, {
    onOpen,
    onMessage,
    // onClose: handleClose,
    // onError: handleError,

    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  async function searchFor(searchTerm) {
    try {
      let res = await youtube.get('search', {
        params: {
          q: searchTerm
        }
      });
      setVideoSearchRes(res.data.items);
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  };

  const handleVideoQueing = (video) => {
    sendJsonMessage({
      type: 'video',
      action: 'add',
      videoId: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium.url
    });
    setVideoSearchRes([]);
  }

  const handleVideoRemoval = (video) => {
    sendJsonMessage({
      type: 'video',
      action: 'remove',
      videoId: video.videoId,
    });
  }

  const handleVideoChange = (video) => {
    sendJsonMessage({
      type: 'video',
      action: 'change',
      videoId: video.videoId,
    });
  };

  return (
    <div className="Room">
      <div className="container">
        <SearchForm searchFor={searchFor} />
        <div className="d-flex justify-content-center">
          <div className="p-1">
            <Video
              sendJsonMessage={sendJsonMessage}
              globalPlaybackTime={globalPlaybackTime}
              globalPlayerState={globalPlayerState}
              setGlobalPlayerState={setGlobalPlayerState}
              roomMembers={roomMembers}
              username={username}
              globalQueue={globalQueue}
              globalVideoId={globalVideoId}
              joinSyncTime={joinSyncTime}
              handleVideoChange={handleVideoChange}
            />
          </div>
          {/* <div className="p-1"> */}
            <Chat
              messages={messages}
              username={username}
              sendJsonMessage={sendJsonMessage}
              connectionStatus={connectionStatus}
              readyState={readyState}
            />
          {/* </div> */}
          <div className="p-1">
            <VideoList
              videoSearchRes={videoSearchRes}
              globalQueue={globalQueue}
              handleVideoQueing={handleVideoQueing}
              handleVideoRemoval={handleVideoRemoval}
              handleVideoChange={handleVideoChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
