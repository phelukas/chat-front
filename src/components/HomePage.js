import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Chat Front!</h1>
      <p>Seu aplicativo moderno para comunicações em tempo real.</p>
      <a href="/login" className="login-link">Entrar</a>
    </div>
  );
};

export default HomePage;
