// /backend/src/database/index.js

const knexfile = require('../../knexfile');
const knex = require('knex');



// Se estiver no ambiente de produção (nuvem), usa a configuração 'production', senão usa 'development'
const config = process.env.NODE_ENV === 'production' 
  ? knexfile.production 
  : knexfile.development;

// Usa a configuração determinada
const db = knex(config);



module.exports = db;