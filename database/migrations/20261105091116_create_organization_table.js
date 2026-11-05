/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.raw(`
    CREATE TABLE organizations (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      status_id SMALLINT UNSIGNED NOT NULL,
      status_entity_type VARCHAR(50) NOT NULL DEFAULT 'ORGANIZATION',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

      PRIMARY KEY (id),

      CONSTRAINT chk_organization_status_type
        CHECK (status_entity_type = 'ORGANIZATION'),

      CONSTRAINT fk_organization_status
        FOREIGN KEY (status_id, status_entity_type)
        REFERENCES status(id, entity_type)
    ) ENGINE=InnoDB;
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.raw(`DROP TABLE organizations;`);
};
