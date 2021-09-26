import './ChatInput.css';
import {useState} from 'react';

const ChatInput = ({sendJsonMessage, connectionStatus}) => {
  const [chatMsg, setChatMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatMsg !== "") {
      sendJsonMessage({ type: "chat", text: chatMsg });
      setChatMsg("");
    };
  };

  const handleChange = (e) => {
    setChatMsg(e.target.value);
  };

  return (
    <div>
      <span>The WebSocket is currently {connectionStatus}</span>
      <form id="msg-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="msg-text"
          name="msg-text"
          autoComplete="off"
          value={chatMsg}
          onChange={handleChange} />
        <button >Send</button>
      </form>
    </div>
  );
};

export default ChatInput;