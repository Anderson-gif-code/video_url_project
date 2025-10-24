// /frontend/src/pages/Register/index.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api'; // Nosso cliente Axios

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      // 1. Envia os dados para a rota de cadastro do backend (POST /users)
      await api.post('/users', { name, email, password });

      alert('Cadastro realizado com sucesso! Faça login para acessar o painel.');
      
      // 2. Após o sucesso, redireciona o usuário para a página de Login
      navigate('/login');

    } catch (error) {
      // 3. Trata erros (ex: e-mail já cadastrado, 400 Bad Request)
      const errorMessage = error.response?.data?.error || 'Erro ao cadastrar. Tente novamente.';
      alert(errorMessage);
      console.error(error);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h1>Criar Nova Conta</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Seu Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br/><br/>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br/><br/>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br/><br/>
        <button type="submit">Cadastrar</button>
      </form>
      
      <p style={{ marginTop: '20px' }}>
        Já tem uma conta? <Link to="/login">Faça Login</Link>
      </p>
    </div>
  );
}

export default Register;