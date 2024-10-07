import React, { useState } from 'react';

function ChatInput({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter your message..." 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
