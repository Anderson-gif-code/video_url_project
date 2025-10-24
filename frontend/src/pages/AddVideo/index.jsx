// /frontend/src/pages/AddVideo/index.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

function AddVideo() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // O token é automaticamente adicionado pelo interceptor do Axios!
      await api.post('/videos', { title, url, description }); 
      
      alert('Vídeo adicionado com sucesso!');
      navigate('/'); // Volta para o Dashboard
    } catch (error) {
      alert('Erro ao adicionar vídeo. Você está logado?');
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Adicionar Novo Vídeo</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Título do Vídeo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="URL do Vídeo (Ex: YouTube)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />
        <button type="submit">Salvar Vídeo</button>
      </form>
    </div>
  );
}

export default AddVideo;