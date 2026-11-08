import type { Organization } from "./organization.types.js";

export interface OrganizationRepository {
  findById(id: string): Promise<Organization | null>;
}
