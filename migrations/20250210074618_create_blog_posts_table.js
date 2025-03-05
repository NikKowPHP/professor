/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('professor_news_posts', (table) => {
    table.increments('id').primary();
    table.string('slug').notNullable().unique();
    table.string('title').notNullable();
    table.string('tag').notNullable();
    table.string('image_url').notNullable();
    table.string('image_alt');
    table.text('excerpt').notNullable();
    table.text('content_html').notNullable();

    table.boolean('is_pinned').defaultTo(false);
    table.timestamps(true, true);
  })
 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('professor_news_posts')

}