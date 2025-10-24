// /frontend/src/pages/Login/index.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import api from '../../api'; // Nosso cliente Axios

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  async function handleLogin(e) {
    e.preventDefault(); // Impede o recarregamento padrão do formulário

    try {
      // 1. Envia as credenciais para o backend
      const response = await api.post('/sessions', { email, password });

      const { token, user } = response.data;
      
      // 2. Armazena o Token e dados do usuário no Local Storage
      // O @Treinamentos:token é a chave que usamos no PrivateRoute
      localStorage.setItem('@Treinamentos:token', token);
      localStorage.setItem('@Treinamentos:user', JSON.stringify(user));
      
      alert(`Bem-vindo, ${user.name}!`);

      // 3. Redireciona para a Dashboard (rota '/')
      navigate('/');

    } catch (error) {
      // 4. Trata erros de login (401 Unauthorized do backend)
      const errorMessage = error.response?.data?.error || 'Erro ao realizar login. Verifique suas credenciais.';
      alert(errorMessage);
      console.error(error);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Acesso ao Painel</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Entrar</button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Não tem uma conta? <Link to="/register">Crie uma!</Link> {/* << NOVO LINK */}
      </p>	
    </div>
  );
}

export default Login;