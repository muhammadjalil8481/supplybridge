/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE status (
          id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
          entity_type VARCHAR(50) NOT NULL,
          code VARCHAR(50) NOT NULL,
          description VARCHAR(255) NULL,
    
          PRIMARY KEY (id),
          UNIQUE KEY uq_status_entity_code (entity_type, code),
          UNIQUE KEY uq_status_id_entity (id, entity_type)
        ) ENGINE=InnoDB;
      `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE status;`);
};
