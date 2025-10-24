// /frontend/src/pages/Dashboard/index.jsx

import React, { useState, useEffect } from 'react';
import api from '../../api';

function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        // Requisição GET protegida para buscar a lista de vídeos
        const response = await api.get('/videos');
        setVideos(response.data);
      } catch (error) {
        alert('Falha ao carregar vídeos.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  if (loading) {
    return <h1>Carregando vídeos...</h1>;
  }

  return (
    <div>
      <h2>Lista de Vídeos de Treinamento</h2>
      {videos.length === 0 ? (
        <p>Nenhum vídeo cadastrado ainda.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {videos.map(video => (
            <div key={video.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
              <h3>{video.title}</h3>
              <p>Criado por: **{video.creator_name}**</p>
              <p>{video.description}</p>
              {/* Exibe o vídeo (funciona com URLs de embed do YouTube/Vimeo) */}
              <iframe 
                width="100%" 
                height="200" 
                src={video.url} 
                frameBorder="0" 
                allowFullScreen
                title={video.title}
              ></iframe>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;