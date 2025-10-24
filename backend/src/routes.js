// /backend/src/routes.js


const ensureAuthenticated = require('./middlewares/ensureAuthenticated'); // Importação
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// A conexão com o banco de dados que criamos
const db = require('./database'); 

// Carrega as variáveis de ambiente (como o APP_SECRET) do .env
require('dotenv').config();

const routes = Router();

// =========================================================
// Rota 1: Cadastro de Usuário (POST /users)
// =========================================================
routes.post('/users', async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Criptografar a Senha
    // O 8 é o 'salt rounds', um fator de custo.
    const password_hash = await bcrypt.hash(password, 8);

    try {
        // 2. Salvar o usuário no banco de dados
        const [id] = await db('users').insert({
            name,
            email,
            password_hash,
        });

        // 3. Retornar a confirmação
        return res.status(201).json({ 
            id, 
            name, 
            email, 
            message: "Usuário cadastrado com sucesso!" 
        });

    } catch (error) {
        // Erro 19 é geralmente violação de UNIQUE (ex: e-mail duplicado)
        if (error.errno === 19) {
             return res.status(400).json({ error: "E-mail já cadastrado." });
        }
        return res.status(500).json({ error: "Erro interno no servidor ao cadastrar usuário." });
    }
});

// =========================================================
// Rota 2: Login/Criação de Sessão (POST /sessions)
// =========================================================
routes.post('/sessions', async (req, res) => {
    const { email, password } = req.body;

    // 1. Buscar o Usuário pelo E-mail
    const user = await db('users').where({ email }).first();

    if (!user) {
        return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    }

    // 2. Comparar a Senha fornecida com o Hash no DB
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
        return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    }

    // 3. Se a senha estiver correta, gerar o JWT
    const token = jwt.sign(
        { id: user.id }, // Payload: informações do usuário que o token irá carregar
        process.env.APP_SECRET, // Chave Secreta do .env
        { expiresIn: '7d' } // Expiração do token (duração de 7 dias)
    );

    // 4. Retornar o token e dados do usuário
    return res.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token, // O frontend usará este token
    });
});

// ... Rotas /users e /sessions aqui ...

// Rotas Protegidas: Aplica o middleware "ensureAuthenticated" em todas as rotas a seguir.
routes.use(ensureAuthenticated); 

// =========================================================
// Rota 3: Adicionar Vídeo (POST /videos) - Rota Protegida
// =========================================================
routes.post('/videos', async (req, res) => {
    const { title, url, description } = req.body;
    // O user_id vem do token decodificado pelo middleware!
    const user_id = req.user.id; 

    try {
        await db('videos').insert({
            title,
            url,
            description,
            user_id,
        });

        return res.status(201).json({ message: "Vídeo adicionado com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao adicionar vídeo." });
    }
});

// =========================================================
// Rota 4: Listar Vídeos (GET /videos) - Rota Protegida
// =========================================================
routes.get('/videos', async (req, res) => {
    try {
        // Busca todos os vídeos no banco de dados
        const videos = await db('videos')
            .select([
                'videos.id',
                'videos.title',
                'videos.url',
                'videos.description',
                'users.name as creator_name' // Pega o nome do criador
            ])
            .innerJoin('users', 'users.id', 'videos.user_id'); // Faz um JOIN com a tabela de usuários

        return res.json(videos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar vídeos." });
    }
});

module.exports = routes;

module.exports = routes;