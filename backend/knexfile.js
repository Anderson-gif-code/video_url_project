// /backend/knexfile.js

const path = require('path');

module.exports = {
  // Configuração para o ambiente de desenvolvimento
  development: {
    client: 'pg', // O cliente que vamos usar
    connection: {
      // O Knex usará este caminho para criar o arquivo do banco de dados
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    migrations: {
      // O Knex buscará os scripts de criação de tabelas (migrations) aqui
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    // Necessário para o SQLite
    useNullAsDefault: true,
  production: {
    client: 'pg', 
    connection: process.env.DATABASE_URL, // Variável que o Render usará
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,

  },
};