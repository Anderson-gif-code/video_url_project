// /frontend/src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Páginas
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddVideo from './pages/AddVideo';

// Componente de Rota Protegida
import PrivateRoute from './routes/Private';

function App() {
  return (
    <BrowserRouter>
      <Routes>
	{/* Rota de CADASTRO (Pública) */}
        <Route path="/register" element={<Register />} />

        {/* Rota Pública (Acessível sem Login) */}
        <Route path="/login" element={<Login />} />
        
        {/* Rotas Privadas (Protegidas pelo PrivateRoute) */}
        <Route element={<PrivateRoute />}>
          {/* O Dashboard será a rota raiz ('/') */}
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/add-video" element={<AddVideo />} />
        </Route>
        
        {/* Rota para página não encontrada */}
        <Route path="*" element={<h1>Página Não Encontrada (404)</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;