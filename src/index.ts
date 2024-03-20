import type {
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";
import { Query } from "orchid-orm";

type UserType = Omit<AdapterUser, "id" | "emailVerified"> & {
  emailVerified?: Date | number | string | null;
};

interface User extends Query {
  inputType: UserType;
}

type AccountType = Omit<AdapterAccount, "access_token"> & {
  access_token?: string | null;
};

interface Account extends Query {
  inputType: AccountType;
}

type SessionInput = Omit<AdapterSession, "expires"> & {
  expires: Date | number | string;
};

interface Session extends Query {
  inputType: SessionInput;
}

type VerificationTokenInput = Omit<VerificationToken, "expires"> & {
  expires: Date | number | string;
};

interface Token extends Query {
  inputType: VerificationTokenInput;
}

interface Db {
  $transaction(fn: () => Promise<unknown>): Promise<void>;
  user: User;
  verificationToken?: Token;
  account?: Account;
  session?: Session;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseTime = (record: any, column: string) => {
  if (record[column] && !(record[column] instanceof Date)) {
    record[column] = new Date(record[column] as string);
  }
  return record as never;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseUser = (user: any) => parseTime(user, "emailVerified");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSession = (user: any) => parseTime(user, "expires");
const parseVerificationToken = parseSession;

const methodsForAccount = (db: { user: User; account: Account }) => ({
  async getUserByAccount({
    provider,
    providerAccountId,
  }: Pick<
    AdapterAccount,
    "provider" | "providerAccountId"
  >): Promise<AdapterUser | null> {
    const user = await db.user
      .whereExists(
        db.account.where({ provider, providerAccountId }),
        "userId",
        "id",
      )
      .takeOptional();

    return user ? parseUser(user) : null;
  },

  async linkAccount(data: AccountType): Promise<void> {
    await db.account.insert(data);
  },

  // This method is defined but not implemented by auth.js
  async unlinkAccount(
    params: Pick<AccountType, "provider" | "providerAccountId">,
  ) {
    await db.account.findByOptional(params).delete();
  },
});

const methodsForSession = (db: Db & { session: Session }) => ({
  // Is used when session strategy is jwt
  async createSession(data: SessionInput): Promise<AdapterSession> {
    const session = await db.session.create(data);
    return parseSession(session);
  },

  async getSessionAndUser(
    sessionToken: string,
  ): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
    const result = await db.session
      .findByOptional({ sessionToken })
      .join(db.user, "id", "userId")
      .select("*", "user.*");

    if (!result) return null;

    const { user, ...session } = result;
    return { user: parseUser(user), session: parseSession(session) } as never;
  },

  async updateSession({
    sessionToken,
    ...data
  }: Partial<SessionInput> &
    Pick<AdapterSession, "sessionToken">): Promise<undefined> {
    await db.session.findByOptional({ sessionToken }).update(data);
  },

  async deleteSession(sessionToken: string): Promise<void> {
    await db.session.findByOptional({ sessionToken }).delete();
  },
});

const methodsForVerificationToken = (db: { verificationToken: Token }) => ({
  async createVerificationToken(
    data: VerificationTokenInput,
  ): Promise<undefined> {
    await db.verificationToken.insert(data);
  },

  async useVerificationToken(
    data: Pick<VerificationToken, "identifier" | "token">,
  ): Promise<VerificationToken | null> {
    const token = await db.verificationToken
      .selectAll()
      .findByOptional(data)
      .delete();

    return token ? parseVerificationToken(token) : null;
  },
});

export const OrchidAdapter = (db: Db) => ({
  async createUser(data: UserType): Promise<AdapterUser> {
    const user = await db.user.create(data);
    return parseUser(user);
  },

  async getUser(id: string): Promise<AdapterUser | null> {
    const user = await db.user.findByOptional({ id });
    return user ? parseUser(user) : null;
  },

  async getUserByEmail(email: string): Promise<AdapterUser | null> {
    const user = await db.user.findByOptional({ email });
    return user ? parseUser(user) : null;
  },

  async updateUser({
    id,
    ...data
  }: Partial<AdapterUser> & Pick<AdapterUser, "id">): Promise<AdapterUser> {
    const user = await db.user.selectAll().findBy({ id }).update(data);
    return parseUser(user);
  },

  // This method is defined but not implemented by auth.js
  async deleteUser(userId: string): Promise<void> {
    await db.$transaction(() =>
      Promise.all([
        db.session && db.session.findByOptional({ userId }).delete(),
        db.account && db.account.findByOptional({ userId }).delete(),
        db.user.findByOptional({ id: userId }).delete(),
      ]),
    );
  },

  ...(db.account
    ? methodsForAccount({ user: db.user, account: db.account })
    : {}),
  ...(db.session ? methodsForSession({ ...db, session: db.session }) : {}),
  ...(db.verificationToken
    ? methodsForVerificationToken({ verificationToken: db.verificationToken })
    : {}),
});
