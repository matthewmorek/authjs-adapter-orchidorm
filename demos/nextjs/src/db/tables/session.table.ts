import { BaseTable } from "../baseTable";
import { UserTable } from "./user.table";

export class SessionTable extends BaseTable {
  readonly table = "session";
  columns = this.setColumns((t) => ({
    sessionToken: t.text().primaryKey(),
    userId: t.uuid().foreignKey("user", "id", {
      onDelete: "CASCADE",
    }),
    expires: t.timestamp(),
  }));

  relations = {
    user: this.belongsTo(() => UserTable, {
      columns: ["userId"],
      references: ["id"],
    }),
  };
}
