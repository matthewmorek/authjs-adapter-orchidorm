import { rakeDb } from "rake-db";
import { config } from "./config";

export const change = rakeDb(
  { databaseURL: config.databaseUrl },
  {
    columnTypes: (t) => t,
    migrationsPath: "./migrations",
    import: (path) => import(path),
  },
);
