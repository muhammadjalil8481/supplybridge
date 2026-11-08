import type { Organization } from "./organization.types.js";
import type { OrganizationRepository } from "./organization.repository.js";

export class InMemoryOrganizationRepository
  implements OrganizationRepository {

  private readonly organizations = new Map<string, Organization>([
    ["1", { id: "1", name: "ABC Traders", status: "ACTIVE" }],
    ["2", { id: "2", name: "XYZ Suppliers", status: "SUSPENDED" }]
  ]);

  async findById(id: string): Promise<Organization | null> {
    return this.organizations.get(id) ?? null;
  }
}
