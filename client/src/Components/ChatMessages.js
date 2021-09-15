import './ChatMessages.css';
import ChatMessage from "./ChatMessage";

const ChatMessages = ({messages}) => {
  return (
    <ul className="ChatMessages">
        {messages
          .map((message, idx) => <ChatMessage key={idx} message={message.text} />)}
    </ul>
  );
};

export default ChatMessages;