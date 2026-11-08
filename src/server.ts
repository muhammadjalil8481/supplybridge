import app from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./database/pool.js";
import { checkDatabaseConnection } from "./database/check-connectivity.js";
import type { Server } from "node:http";

const SHUTDOWN_TIMEOUT_MS = 20_000;

let isShuttingDown = false;
let server: Server | undefined;
let poolCleanupPromise: Promise<void> | undefined;

function cleanupPool(): Promise<void> {
  if (!poolCleanupPromise) {
    poolCleanupPromise = pool.end()
      .then(() => console.log("MySQL pool closed successfully."))
      .catch((dbError: unknown) => {
        console.error("MySQL shutdown error:", dbError);
        process.exitCode = 1;
      });
  }

  return poolCleanupPromise;
}

function shutdown(signal: string): void {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  console.log(`${signal} received. Starting graceful shutdown...`);

  const forceShutdownTimer = setTimeout(() => {
    console.error("Graceful shutdown timed out. Forcing exit.");
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);

  const closePool = (): void => {
    void cleanupPool().finally(() => clearTimeout(forceShutdownTimer));
  };

  if (server === undefined) {
    closePool();
    return;
  }

  server.close((error) => {
    if (error) {
      console.error("HTTP server shutdown error:", error);
      process.exitCode = 1;
    } else {
      console.log("HTTP server closed successfully.");
    }

    closePool();
  });
}

async function startServer(): Promise<void> {
  try {
    await checkDatabaseConnection();

    if (isShuttingDown) {
      await cleanupPool();
      return;
    }

    let listeningServer: Server;
    const handleServerError = (error: Error): void => {
      listeningServer.off("error", handleServerError);
      console.error("Failed to start SupplyBridge:", error);
      process.exitCode = 1;
      void cleanupPool();
    };

    listeningServer = app.listen(env.PORT, () => {
      listeningServer.off("error", handleServerError);
      console.log(`SupplyBridge running on port ${env.PORT}`);
    });
    server = listeningServer;
    listeningServer.once("error", handleServerError);
  } catch (error) {
    console.error("Failed to start SupplyBridge:", error);
    process.exitCode = 1;
    await cleanupPool();
  }
}

void startServer();

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
