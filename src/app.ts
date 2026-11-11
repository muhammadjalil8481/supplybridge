import express from "express";
import { healthRouter } from "./modules/health/health.routes.js";
import { organizationRouter } from "./modules/organizations/organization.routes.js";

const app = express();

app.use("/health", healthRouter);
app.use("/organizations", organizationRouter);

export default app;