export type OrganizationStatus =
  | "ACTIVE"
  | "SUSPENDED";

export interface Organization {
  id: string;
  name: string;
  status: OrganizationStatus;
}
