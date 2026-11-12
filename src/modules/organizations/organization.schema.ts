import { z } from "zod";
import { idSchema } from "../../common/schemas/id.schema.js";

export const organizationIdParamsSchema = z.object({
  id: idSchema("Organization ID")
});

export type OrganizationIdParams = z.output<typeof organizationIdParamsSchema>;

export const createOrganizationSchema  = z.strictObject({
  name: z.string().trim().min(1).max(255),
});

export type CreateOrganizationInput = z.output<typeof createOrganizationSchema>;