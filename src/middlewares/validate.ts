import type { RequestHandler } from "express";
import { z } from "zod";

type ValidationTarget = "params" | "body";

function validate(
  target: ValidationTarget,
  schema: z.ZodType,
): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      res.status(400).json({
        status: "error",
        message: `Invalid request ${target === "params" ? "parameters" : "body"}`,
        errors: z.flattenError(result.error),
      });
      return;
    }

    if (target === "params") {
      res.locals.validatedParams = result.data;
    } else {
      res.locals.validatedBody = result.data;
    }

    next();
  };
}

export const validateParams = (schema: z.ZodType): RequestHandler =>
  validate("params", schema);

export const validateBody = (schema: z.ZodType): RequestHandler =>
  validate("body", schema);