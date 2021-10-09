import './ChatMessage.css';

const ChatMessage = ({ message, username, self }) => {
  return (
    <article
          key={message.idx}
          className={'message-container' + (username === self ? ' own-message' : '')}>
          <header className='message-header'>
            <h4 className='message-sender'>{username === self ? 'You' : username}</h4>
            {/* <span className='message-time'>
              {new Date(message.sentAt).toLocaleTimeString(undefined, { timeStyle: 'short' })}
            </span> */}
          </header>
          <p className='message-body'>{message}</p>
    </article>
  );
};

export default ChatMessage;