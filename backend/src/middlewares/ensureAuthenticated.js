// /backend/src/middlewares/ensureAuthenticated.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;

    // 1. Verifica se o Header Authorization existe
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    // O header vem no formato "Bearer [token]". Extraímos apenas o token.
    const [, token] = authHeader.split(' '); 

    try {
        // 2. Verifica e decodifica o token usando a chave secreta
        const decoded = jwt.verify(token, process.env.APP_SECRET);

        // 3. Armazena o ID do usuário na requisição para uso posterior
        req.user = {
            id: decoded.id, // O ID que colocamos no payload do token
        };

        // 4. Continua para a próxima função (a rota em si)
        return next();

    } catch (err) {
        // Se o token for inválido (expirado ou modificado)
        return res.status(401).json({ error: 'Token inválido.' });
    }
}

module.exports = ensureAuthenticated;