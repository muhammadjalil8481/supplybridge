import { z } from "zod";
import { idSchema } from "../../common/schemas/id.schema.js";

export const organizationIdParamsSchema = z.object({
  id: idSchema("Organization ID")
});