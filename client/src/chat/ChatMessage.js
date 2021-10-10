import './ChatMessage.css';

const ChatMessage = ({ message, username, self }) => {
  return (
    <article
          key={message.idx}
          // className={'message-container' + (username === self ? ' own-message' : '')}>
          className='message-container'>
          <h4 className='message-sender'>{username === self ? 'You: ' : `${username}: `}</h4>
          <p className='message-body'>{message}</p>
    </article>
  );
};

export default ChatMessage;