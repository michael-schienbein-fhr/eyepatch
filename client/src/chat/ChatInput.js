import './ChatInput.css';
import {useState} from 'react';

const ChatInput = ({sendJsonMessage, connectionStatus, username}) => {
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
    <footer className='message-input-container'>
				<p className='chatting-as'>You are chatting as “{username}”</p>

				<div className='message-input-container-inner'>
					<input
						autoFocus
						placeholder='Type a message'
						type='text'
						autoComplete='off'

						value={chatMsg}
						onChange={handleChange}

						onKeyPress={(e) => {
							if (e.key === 'Enter') handleSubmit(e);
						}}
					/>

					<button
						className='icon-button'
						onClick={handleSubmit}
						// disabled={!isConnectionOpen}
            >
						{/* {sendIcon} */}
					</button>
				</div>
			</footer>
    // <div>
    //   <span>The WebSocket is currently {connectionStatus}</span>
    //   <form id="msg-form" onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       id="msg-text"
    //       name="msg-text"
    //       autoComplete="off"
    //       value={chatMsg}
    //       onChange={handleChange} />
    //     <button >Send</button>
    //   </form>
    // </div>
  );
};

export default ChatInput;