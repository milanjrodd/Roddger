import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { Database } from "bun:sqlite";
import path from "path";

// Create the database
const databasePath = path.resolve(import.meta.dir, "db.sqlite");
const sqlite = new Database(databasePath);
sqlite.exec("PRAGMA journal_mode = WAL;"); // Enable WAL mode
export const db = drizzle(sqlite);

// Migrate the database
console.log("Migrating database...");
const migrationsFolderPath = path.resolve(import.meta.dir, "./migrations");
await migrate(db, { migrationsFolder: migrationsFolderPath });
