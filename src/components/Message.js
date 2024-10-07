import React from 'react';
import './Message.css'; // For styling

function Message({ message }) {
  return (
    <div className={`message ${message.sender}`}>
      <div className="message-content">
        {message.text}
      </div>
    </div>
  );
}

export default Message;
