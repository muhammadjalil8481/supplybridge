import type { RequestHandler, Request, Response, NextFunction } from "express";
import { z } from "zod";

export function validateParams<T extends z.ZodType>(
  schema: T,
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      res.status(400).json({
        status: "error",
        message: "Invalid request parameters",
        errors: z.flattenError(result.error),
      });
      return;
    }

    next();
  };
}