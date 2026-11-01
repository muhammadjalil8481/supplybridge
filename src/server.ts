import app from "./app.js";

const PORT = 3000;
const SHUTDOWN_TIMEOUT_MS = 10_000;

const server = app.listen(PORT, () => {
  console.log(`SupplyBridge running on port ${PORT}`);
});

let isShuttingDown = false;

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

  forceShutdownTimer.unref();

  server.close((error) => {
    if (error) {
      console.error("Error while closing HTTP server:", error);
      process.exitCode = 1;
    } else {
      console.log("HTTP server closed successfully.");
    }

    clearTimeout(forceShutdownTimer);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
