import './ChatMessages.css';
import ChatMessage from "./ChatMessage";
import { useRef, useEffect } from 'react';

const ChatMessages = ({ messages, self }) => {
  const scrollTarget = useRef(null);

  useEffect(() => {
    if (scrollTarget.current) {
      scrollTarget.current.scrollIntoView({ behavior: 'smooth' });
    }
    console.log(messages)
  }, [messages.length]);

  return (
    <div className='ChatMessages'>
      {messages.map((message, idx) => (
        <ChatMessage
          key={idx}
          username={message.username}
          self={self}
          message={message.text}
        />
      ))}
      <div ref={scrollTarget} />
    </div>
  );
};

export default ChatMessages;