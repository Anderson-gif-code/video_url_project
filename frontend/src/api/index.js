// /frontend/src/api/index.js

import axios from 'axios';

// Cria uma instância do Axios
const api = axios.create({
    // A URL base do nosso backend Node.js/Express
    baseURL: 'http://localhost:3000', 
});

// Opcional: Adiciona um interceptor para incluir o token JWT em todas as requisições.
// Isso evita que você tenha que adicionar o token manualmente toda vez.
api.interceptors.request.use(async config => {
    // Pega o token do armazenamento local (se existir)
    const token = localStorage.getItem('@Treinamentos:token');

    // Se houver um token, adiciona ele ao cabeçalho (Header) da requisição
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;