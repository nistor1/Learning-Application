import React, { useState } from 'react';
import './ChatbotPage.css';

export default function ChatbotPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/chatbot/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ message: input }),
            });

            const data = await res.json();
            const botMessage = { role: 'assistant', content: data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error('Chatbot error:', err);
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Something went wrong. Please try again.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, i) => (
                    <div key={i} className={`chat-message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask something..."
                />
                <button onClick={sendMessage} disabled={loading}>
                    {loading ? '...' : 'Send'}
                </button>
            </div>
        </div>
    );
}
