import { config as dotenv } from "dotenv";

dotenv({ path: ".env" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is missing in .env");

export const config = {
  databaseUrl,
};
