import { orchidORM } from "orchid-orm";
import { config } from "./config";
import { UserTable } from './tables/user.table';
import { VerificationTokenTable } from './tables/verificationToken.table';
import { AccountTable } from './tables/account.table';
import { SessionTable } from './tables/session.table';

export const db = orchidORM(
  {
    databaseURL: config.databaseUrl,
    log: true,
  },
  {
    user: UserTable,
    verificationToken: VerificationTokenTable,
    account: AccountTable,
    session: SessionTable,
  },
);
