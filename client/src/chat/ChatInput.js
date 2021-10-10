import './ChatInput.css';
import { useState } from 'react';

const ChatInput = ({ sendJsonMessage, connectionStatus, username }) => {
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

  const isConnectionOpen = (connectionStatus === 'Open') ? true : false;
  return (
    <footer className='message-input-container form-group'>
      <div className='message-input-container-inner '>
        <input
          className="form-control form-control-md flex-grow-1"
          name="chatMsg"
          type="text"
          placeholder="Type a message.."
          value={chatMsg}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSubmit(e);
          }}
        />
        <button
          className="btn btn-md btn-outline-secondary"
          onClick={handleSubmit}
          disabled={!isConnectionOpen}
        >
          Send
        </button>
      </div>
    </footer>
  );
};

export default ChatInput;