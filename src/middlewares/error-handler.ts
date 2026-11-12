import type { ErrorRequestHandler, RequestHandler, Request, Response, NextFunction } from "express";

export const notFoundHandler: RequestHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
};

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  console.error("Request error:", error);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
