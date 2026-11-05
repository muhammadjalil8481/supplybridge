import { Router } from "express";

const healthRouter: Router = Router();

healthRouter.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    application: "SupplyBridge",
  });
});

export { healthRouter };
