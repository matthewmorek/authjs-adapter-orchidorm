import { BaseTable } from "../baseTable";

export class VerificationTokenTable extends BaseTable {
  readonly table = "verificationToken";
  columns = this.setColumns((t) => ({
    identifier: t.text(),
    token: t.text(),
    expires: t.timestamp(),
    ...t.primaryKey(["identifier", "token"]),
  }));
}
