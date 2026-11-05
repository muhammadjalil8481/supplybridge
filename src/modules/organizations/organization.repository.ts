import type { Organization } from "./organization.types.js";

export interface OrganizationRepository {
  findById(id: number): Promise<Organization | null>;
}