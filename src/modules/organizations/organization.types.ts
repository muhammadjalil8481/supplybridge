export type OrganizationStatus =
  | "ACTIVE"
  | "SUSPENDED";

export interface Organization {
  id: number;
  name: string;
  status: OrganizationStatus;
}