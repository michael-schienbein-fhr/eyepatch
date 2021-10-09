import './Chat.css';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages'

const Chat = ({messages, sendJsonMessage, connectionStatus, readyState, username}) => {
  return (
    <div className="Chat">
      <ChatMessages 
        messages={messages}
        self={username}
      />
      <ChatInput 
        sendJsonMessage={sendJsonMessage} 
        connectionStatus={connectionStatus}
        readyState={readyState}
        username={username}
      />
    </div>
  );
};

export default Chat;