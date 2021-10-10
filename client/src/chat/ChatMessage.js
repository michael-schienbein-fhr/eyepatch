import './ChatMessage.css';

const ChatMessage = ({ message, username, self }) => {
  return (
    <article
          key={message.idx}
          // className={'message-container' + (username === self ? ' own-message' : '')}>
          className='message-container'>
          <header className='message-header'>
            <h4 className='message-sender'>{username === self ? 'You' : username}</h4>
          </header>
          <p className='message-body'>{message}</p>
    </article>
  );
};

export default ChatMessage;