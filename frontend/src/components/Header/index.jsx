// /frontend/src/components/Header/index.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Usuário');

  // Carrega o nome do usuário do Local Storage ao montar o componente
  useEffect(() => {
    const userString = localStorage.getItem('@Treinamentos:user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserName(user.name);
      } catch (e) {
        // Ignora erro de parsing e mantém 'Usuário'
      }
    }
  }, []);

  function handleLogout() {
    // 1. Remove o token e os dados do usuário do Local Storage
    localStorage.removeItem('@Treinamentos:token');
    localStorage.removeItem('@Treinamentos:user');
    
    // 2. Redireciona para a página de login
    navigate('/login');
  }

  return (
    <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 20px', 
        backgroundColor: '#333', 
        color: 'white' 
    }}>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Dashboard</Link>
        <Link to="/add-video" style={{ color: 'white' }}>Adicionar Vídeo</Link>
      </nav>
      <div>
        <span>Bem-vindo(a), {userName}</span>
        <button 
            onClick={handleLogout} 
            style={{ marginLeft: '15px', padding: '5px 10px', cursor: 'pointer' }}
        >
            Sair
        </button>
      </div>
    </header>
  );
}

export default Header;