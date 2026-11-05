import app from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./database/pool.js";
import { checkDatabaseConnection } from "./database/check-connectivity.js";
import type { Server } from "node:http";

const SHUTDOWN_TIMEOUT_MS = 20_000;

let isShuttingDown = false;
let server: Server | undefined;

function shutdown(signal: string): void {
  if (isShuttingDown || server === undefined) {
    return;
  }

  isShuttingDown = true;

  console.log(`${signal} received. Starting graceful shutdown...`);

  const forceShutdownTimer = setTimeout(() => {
    console.error("Graceful shutdown timed out. Forcing exit.");
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);

  forceShutdownTimer.unref();

  server.close(async (error) => {
    if (error) {
      console.error("HTTP server shutdown error:", error);
      process.exitCode = 1;
    } else {
      console.log("HTTP server closed successfully.");
    }

    try {
      await pool.end();
      console.log("MySQL pool closed successfully.");
    } catch (dbError) {
      console.error("MySQL shutdown error:", dbError);
      process.exitCode = 1;
    }

    clearTimeout(forceShutdownTimer);
  });
}

async function startServer(): Promise<void> {
  try {
    await checkDatabaseConnection();

    server = app.listen(env.PORT, () => {
      console.log(`SupplyBridge running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start SupplyBridge:", error);
    process.exitCode = 1;
    await pool.end();
  }
}

void startServer();

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));