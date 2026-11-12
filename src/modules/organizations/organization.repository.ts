import type { RowDataPacket } from "mysql2";
import { pool } from "../../database/pool.js";
import type { CreateOrganizationParams, Organization } from "./organization.types.js";

export interface OrganizationRow extends RowDataPacket {
  id: string;
  name: string;
  status: string;
}

export class OrganizationRepository {
  async findById(id: string): Promise<Organization | null> {
    const [rows] = await pool.execute<OrganizationRow[]>(
      `
                SELECT
                    O.id,
                    O.name,
                    S.code AS status
                FROM organizations O
                INNER JOIN status S 
                    ON S.id = O.status_id 
                    AND S.entity_type = O.status_entity_type
                WHERE O.id = ?

            `,
      [id],
    );

    if (!rows || rows.length === 0 || !rows[0]) {
      return null;
    }

    const organization = rows[0];

    return {
      id: organization.id,
      name: organization.name,
      status: organization.status as Organization["status"],
    };
  }

  async createOne(params: CreateOrganizationParams): Promise<void> {
    await pool.execute(
      `
        INSERT INTO organizations (name, status_id, status_entity_type)
        VALUES (?, ?, 'ORGANIZATION')
      `,
      [params.name, params.status_id]
    );
  }
}
