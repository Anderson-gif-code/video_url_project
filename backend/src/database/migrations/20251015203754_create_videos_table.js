// No seu arquivo de migration (ex: YYYYMMDDHHmmss_create_videos_table.js)

exports.up = function(knex) {
    return knex.schema.createTable('videos', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('url').notNullable(); // URL do vídeo (ex: link do YouTube)
        table.string('description');

        // Chave estrangeira: liga o vídeo ao usuário que o criou
        table.integer('user_id')
             .references('id')
             .inTable('users')
             .onDelete('CASCADE') // Se o usuário for deletado, os vídeos dele também são.
             .notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('videos');
};