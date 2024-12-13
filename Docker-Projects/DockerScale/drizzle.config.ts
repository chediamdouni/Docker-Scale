import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: "localhost",
    user: "postgres",
    password: "0000",
    database: "gestion_users",
    port: 5432,
  },
} satisfies Config;
