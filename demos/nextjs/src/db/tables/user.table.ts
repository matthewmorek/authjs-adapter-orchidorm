import { BaseTable } from "../baseTable";
import { AccountTable } from "./account.table";
import { SessionTable } from "./session.table";

export class UserTable extends BaseTable {
  readonly table = "user";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    name: t.text().nullable(),
    email: t.text(),
    emailVerified: t.timestamp().nullable(),
    image: t.text().nullable(),
  }));

  relations = {
    accounts: this.hasMany(() => AccountTable, {
      columns: ["id"],
      references: ["userId"],
    }),
    sessions: this.hasMany(() => SessionTable, {
      columns: ["id"],
      references: ["userId"],
    }),
  };
}
