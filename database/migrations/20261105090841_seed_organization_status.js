/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
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
exports.down = async function (knex) {
  await knex.raw(`
        DELETE FROM status
        WHERE entity_type = 'ORGANIZATION'
          AND name IN ('ACTIVE', 'SUSPENDED')
        LIMIT 2;
      `);
};
