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
    //connectionString: process.env.POSTGRES_URL || "postgresql://postgres:0000@localhost:5432/gestion_users",
  },
} satisfies Config;
