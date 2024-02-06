import React, { useState } from 'react';
import { Card, Space, Button } from 'antd';
import ChatComponent from '../Chat/ChatComponent';


const Contatos = () => {
  const [showChat, setShowChat] = useState(false); 
  const handleCardClick = () => {
    setShowChat(true); 
  };

  if (showChat) {
    return <ChatComponent />;
  }

  return (
    <Space direction="horizontal" size={16}>
      <Card
        title="Criar uma nova sala"
        extra={
          <Button type="link" onClick={(e) => e.preventDefault()} style={{ padding: 0, height: 'auto' }}>
            More
          </Button>
        }
        style={{
          width: 300,
          cursor: 'pointer',
        }}
        onClick={handleCardClick}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
  );
};

export default Contatos;