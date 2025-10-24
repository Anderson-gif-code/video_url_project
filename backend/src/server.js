// /backend/src/server.js
const express = require('express');
const cors = require('cors'); // Vamos instalar o CORS em breve
const routes = require('./routes'); // Importa as rotas

// Inicializa o aplicativo Express
const app = express();

// Configura o CORS para permitir requisições do frontend
app.use(cors());

// Middleware para que o Express entenda requisições com JSON
app.use(express.json());

// Adiciona todas as rotas da nossa aplicação
app.use(routes);

// Define a porta
const PORT = 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});