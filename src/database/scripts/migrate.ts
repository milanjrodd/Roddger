import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "@database/db";
import { $ } from "bun";
import path from "path";

console.log("Migrating database...");

// Generate the migration
await $`bunx drizzle-kit generate:sqlite`;

// Migrate the database
const migrationsFolderPath = path.resolve(import.meta.dir, "../migrations");
await migrate(db, { migrationsFolder: migrationsFolderPath });
