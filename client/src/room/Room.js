import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Chat from '../chat/Chat';
import Video from '../video/Video';

const WEBSOCKET_BASE = (process.env.NODE_ENV === "test")
  ? "ws://192.168.1.40:8001"
  : "ws://localhost:8001" //put heroku here

const Room = () => {

  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [globalPlaybackTime, setGlobalPlaybackTime] = useState(null);

  const changeUsername = () => {
    setUsername(prompt("What Is Your Username?"));
  }

  useEffect(changeUsername, []);

  const urlParts = document.URL.split("/");
  const roomName = urlParts[urlParts.length - 1];

  const wsURL = `${WEBSOCKET_BASE}/room/${roomName}`;

  const onOpen = () => {
    console.log('opened');

    sendJsonMessage({ type: "join", username })
  };
  const onMessage = (e) => {
    console.log('message', e.data);
    const message = JSON.parse(e.data);
    // console.log(message.type)
    if (message.type === 'chat') {
      setMessages((_messages) => [..._messages, message]);
    } else if (message.type === 'video'){
      setGlobalPlaybackTime(message.time);
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

  return (
    <div>
      <Chat
        messages={messages}
        sendJsonMessage={sendJsonMessage}
        connectionStatus={connectionStatus}
        readyState={readyState}
      />
      <Video
        sendJsonMessage={sendJsonMessage}
        globalPlaybackTime={globalPlaybackTime}
      />
    </div>
  );
}

export default Room;
