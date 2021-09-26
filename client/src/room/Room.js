import './Room.css';
import { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Chat from '../chat/Chat';
import Video from '../video/Video';
import UserContext from "../auth/UserContext";

const WEBSOCKET_BASE = (process.env.NODE_ENV === "test")
  ? "ws://192.168.1.40:8001"
  : "ws://localhost:8001" //put heroku here

const Room = () => {
  const { currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  // const globalPlaybackTime = useRef(null);
  const [globalPlaybackTime, setGlobalPlaybackTime] = useState(null);
  const { id } = useParams();
  useEffect(function changeUsername() {
    setUsername(currentUser.username);
  }, []);

  const wsURL = `${WEBSOCKET_BASE}/room/${id}`;

  const onOpen = () => {
    console.log('opened');
    sendJsonMessage({ type: "join", username })
  };

  const onMessage = (e) => {
    // console.log('message', e.data);
    // console.debug(e.data)
    const message = JSON.parse(e.data);
    if (message.type === 'chat') {
      setMessages((_messages) => [..._messages, message]);
    } else if (message.type === 'time') {
      // globalPlaybackTime.current = message.time;
      setGlobalPlaybackTime(message.time);
    };
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

  return (
    <div className="Room">
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="p-1">
            <Video
              sendJsonMessage={sendJsonMessage}
              globalPlaybackTime={globalPlaybackTime}
            />
          </div>
          <div className="p-1">
            <Chat
              messages={messages}
              sendJsonMessage={sendJsonMessage}
              connectionStatus={connectionStatus}
              readyState={readyState}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
