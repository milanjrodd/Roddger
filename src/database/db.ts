import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import path from "path";

const databasePath = path.resolve(import.meta.dir, "db.sqlite");

const sqlite = new Database(databasePath);
export const db = drizzle(sqlite);
