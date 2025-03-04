/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('quote_section', (table) => {
      table.string('id').primary();
      table.text('quote').notNullable();
      table.string('created_at').notNullable();
      table.string('updated_at').notNullable();
    })
    .then(() => {
      return knex.schema.createTable('youtube_section', (table) => {
        table.string('id').primary();
        table.string('youtube_url').notNullable();
        table.text('quote').notNullable();
        table.string('created_at').notNullable();
        table.string('updated_at').notNullable();
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('youtube_section')
    .then(() => {
      return knex.schema.dropTableIfExists('quote_section');
    });
};