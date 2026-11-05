/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.raw(`
        INSERT INTO status (entity_type, code, description)
        VALUES
          ('ORGANIZATION', 'ACTIVE', 'Organization can operate normally'),
          ('ORGANIZATION', 'SUSPENDED', 'Organization is temporarily restricted');
      `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.raw(`
        DELETE FROM status
        WHERE entity_type = 'ORGANIZATION'
          AND code IN ('ACTIVE', 'SUSPENDED')
        LIMIT 2;
      `);
};
