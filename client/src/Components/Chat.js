import './Chat.css';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages'

const Chat = ({messages, sendJsonMessage, connectionStatus, readyState}) => {
  return (
    <div className="Chat">
      <ChatMessages messages={messages}/>
      <ChatInput 
        sendJsonMessage={sendJsonMessage} 
        connectionStatus={connectionStatus}
        readyState={readyState}
      />
    </div>
  );
};

export default Chat;