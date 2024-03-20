import { BaseTable } from "../baseTable";
import { UserTable } from "./user.table";

export class AccountTable extends BaseTable {
  readonly table = "account";
  columns = this.setColumns((t) => ({
    userId: t.uuid().foreignKey("user", "id", {
      onDelete: "CASCADE",
    }),
    type: t.text(),
    provider: t.text(),
    providerAccountId: t.text(),
    access_token: t.text().nullable(),
    token_type: t.text().nullable(),
    id_token: t.text().nullable(),
    refresh_token: t.text().nullable(),
    scope: t.text(),
    expires_at: t.integer().nullable(),
    session_state: t.text().nullable(),
    ...t.primaryKey(["provider", "providerAccountId"]),
  }));

  relations = {
    user: this.belongsTo(() => UserTable, {
      columns: ["userId"],
      references: ["id"],
    }),
  };
}
