import { OrganizationRepository } from "./organization.repository.js";
import type { Organization } from "./organization.types.js";

export class OrganizationService {
  constructor(private readonly repository: OrganizationRepository) {}

  async getById(id: string): Promise<Organization | null> {
    return this.repository.findById(id);
  }
}