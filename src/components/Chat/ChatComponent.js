import React, { useState, useEffect, useRef } from 'react';
import { getUser } from '../../api/userService';
import styles from './ChatComponent.module.css';

function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [userId, setUserId] = useState(null);
    const ws = useRef(null);

    useEffect(() => {
        const fetchUserAndConnect = async () => {
            try {
                const user = await getUser();
                setUserId(user.id);

                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();

                const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                const identificarClienteSala = `${user.email}|${formattedDate}`;

                ws.current = new WebSocket(`ws://localhost:8000/ws/${identificarClienteSala}`);

                ws.current.onopen = () => console.log("WebSocket connection opened.");
                ws.current.onclose = () => console.log("WebSocket connection closed.");

                ws.current.onmessage = e => {
                    const message = { text: e.data };
                    setMessages(prev => [...prev, message]);
                };

                return () => {
                    if (ws.current) {
                        ws.current.close();
                    }
                };
            } catch (error) {
                console.error("Failed to fetch user or connect to WebSocket", error);
            }
        };

        fetchUserAndConnect();
    }, []);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        ws.current.send(inputValue);
        setInputValue('');
    };


    const handleInputChange = (e) => setInputValue(e.target.value);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={styles.chatContainer}>
            <h1 className={styles.header}>WebSocket Chat</h1>
            <h2>Your ID: <span>{userId || 'Loading...'}</span></h2>
            <ul className={styles.messageList}>
                {messages.map((msg, index) => (
                    <li key={index} className={msg.userId === userId ? styles.sent : styles.received}>
                        {msg.text}
                    </li>
                ))}
            </ul>

            <div className={styles.inputArea}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );

}

export default ChatComponent;