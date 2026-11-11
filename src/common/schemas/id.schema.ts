import { z } from "zod";

const MAX_UNSIGNED_BIGINT = 18446744073709551615n;

export const idSchema = (name: string = "ID") => z
  .string()
  .regex(/^[1-9]\d*$/, {
    error: `${name} must be a positive integer`,
  })
  .pipe(
    z.string().refine(
      (id) => BigInt(id) <= MAX_UNSIGNED_BIGINT,
      {
        error: `${name} exceeds the maximum allowed value`,
      },
    ),
  );