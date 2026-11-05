import { pool } from "./pool.js";

export async function checkDatabaseConnection(): Promise<void> {
  await pool.query("SELECT 1");
  console.log("MySQL connection established");
}
