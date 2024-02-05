import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateUserPage from './pages/CreateUserPage';
import HomeUserPage from './pages/HomeUserPage';
import Login from './components/Auth/Login';
import './darkMode.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/home" element={<HomeUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
