import { config as dotenv } from "dotenv";

dotenv({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is missing in .env.local");

export const config = {
  databaseUrl,
};
