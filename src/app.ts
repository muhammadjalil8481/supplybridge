import express from "express";
import { healthRouter } from "./modules/health/health.routes.js";
import { organizationRouter } from "./modules/organizations/organization.routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler.js";

const app = express();

app.use("/health", healthRouter);
app.use("/organizations", organizationRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;