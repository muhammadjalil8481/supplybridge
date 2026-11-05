import express from "express";
import { healthRouter } from "./modules/health/health.routes.js";

const app = express();

app.use("/health", healthRouter)

export default app;