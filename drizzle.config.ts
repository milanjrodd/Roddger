import type { Config } from "drizzle-kit";
export default {
  out: "./src/database/migrations",
  schema: "./src/database/schema/*",
} satisfies Config;
