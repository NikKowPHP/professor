/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex('quote_section').insert([
    {
      id: 'quoteItem1',
      quote:
        '"True disruption in healthcare requires a shift in mindset. We need to think bigger, embrace cost reduction, and consider our impact on the planet and the economy to achieve sustainability.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  await knex('youtube_section').insert([
    {
      id: 'youtubeItem1',
      youtube_url: 'SDrQH84YzU0',
      quote:
        '"Embrace failure! It is essential to innovation. Treat every failure as a learning opportunity, not a setback.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex('quote_section').del();
  await knex('youtube_section').del();
};