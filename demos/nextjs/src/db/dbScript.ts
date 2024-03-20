import { rakeDb } from "rake-db";
import { appCodeUpdater } from "orchid-orm/codegen";
import { config } from "./config";
import { BaseTable } from "./baseTable";

export const change = rakeDb(
  { databaseURL: config.databaseUrl },
  {
    baseTable: BaseTable,
    migrationsPath: "./migrations",
    appCodeUpdater: appCodeUpdater({
      tablePath: (tableName) => `./tables/${tableName}.table.ts`,
      ormPath: "./db.ts",
    }),
    useCodeUpdater: process.env.NODE_ENV === "development",
    import: (path) => import(path),
  },
);
