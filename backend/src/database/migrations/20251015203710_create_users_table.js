// No seu arquivo de migration (ex: YYYYMMDDHHmmss_create_users_table.js)

exports.up = function(knex) {
  // Método 'up' é usado para criar a tabela
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password_hash').notNullable(); // Armazenará a senha criptografada
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  // Método 'down' é usado para desfazer (dropar) a tabela
  return knex.schema.dropTable('users');
};