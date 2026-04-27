import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/gemini';
import { useAppContext } from '../context/AppContext';
import { Send } from 'lucide-react';
import './ChatPage.css';

const QUICK_CHIPS = [
  "How do I register?",
  "What is EVM?",
  "What documents are needed on election day?",
  "What is NOTA?"
];

const ChatPage = () => {
  const { profile } = useAppContext();
  const [messages, setMessages] = useState([
    { role: 'system', text: "Namaste! I'm VoteWise AI. Ask me anything about Indian elections, voter registration, or ECI rules." }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    const userMsg = text.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputVal('');
    setIsTyping(true);

    const level = profile?.knowledgeLevel || 'beginner';
    const language = profile?.language || 'en';
    
    // We pass history (excluding the very first system greeting optionally)
    const history = messages.filter(m => m.role !== 'system');
    
    const reply = await getChatResponse(history, userMsg, level, language);
    
    setMessages(prev => [...prev, { role: 'system', text: reply }]);
    setIsTyping(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSend(inputVal);
  };

  return (
    <div className="chat-page">
      <h2>Election Assistant</h2>
      
      <div className="card chat-container">
        <div className="messages-area">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-bubble ${msg.role === 'user' ? 'user-msg' : 'sys-msg'}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="message-bubble sys-msg typing-indicator">
              <span>.</span><span>.</span><span>.</span>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
        
        {messages.length === 1 && (
          <div className="quick-chips">
            {QUICK_CHIPS.map((chip, i) => (
              <button key={i} className="chip-btn" onClick={() => handleSend(chip)}>
                {chip}
              </button>
            ))}
          </div>
        )}

        <form className="chat-input-area" onSubmit={onSubmit}>
          <input 
            type="text" 
            className="input-field chat-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask about elections..."
            aria-label="Chat message"
            disabled={isTyping}
          />
          <button type="submit" className="btn-primary send-btn" aria-label="Send message" disabled={isTyping || !inputVal.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
