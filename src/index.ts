import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";
import type { OrchidORM } from "orchid-orm";

export function OrchidAdapter(db: OrchidORM): Adapter {
  return {
    async createUser(user) {
      const createdUser = await db.user.create(user);
      return createdUser as unknown as AdapterUser;
    },
    async getUser(id) {
      const user = await db.user.findBy({ id });
      return user as unknown as AdapterUser;
    },
    async getUserByEmail(email) {
      const user = await db.user.findBy({ email });
      return user as unknown as AdapterUser;
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const user = await db.user.select("*", {
        // @ts-expect-error Orchid cannot know table schema ahead oftime
        account: (q) => q.account.join().where({ provider, providerAccountId }),
      });
      return user as unknown as AdapterUser;
    },
    async updateUser(user) {
      const updatedUser = await db.user.findBy({ id: user.id }).update(user).take();
      return updatedUser as unknown as AdapterUser;
    },
    async deleteUser(userId) {
      await db.session.findBy({ userId: userId }).delete();
      await db.account.findBy({ userId: userId }).delete();
      await db.account.findBy({ id: userId }).delete();
    },
    async linkAccount(account) {
      const createdAccount = await db.account.create(account);
      return createdAccount as unknown as AdapterAccount;
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await db.account.findBy({ provider, providerAccountId }).delete();
    },
    async createSession(session) {
      const createdSession = await db.session.create(session);
      return createdSession as unknown as AdapterSession;
    },
    async getSessionAndUser(sessionToken) {
      const session = await db.session.findBy({ sessionToken });
      const user = await db.user.findBy({ id: session.userId });
      return { session, user } as unknown as { session: AdapterSession; user: AdapterUser };
    },
    async updateSession(session) {
      const updatedSession = await db.session
        .findBy({ sessionToken: session.sessionToken })
        .update(session)
        .take();
      return updatedSession as unknown as AdapterSession;
    },
    async deleteSession(sessionToken) {
      await db.session.findBy({ sessionToken }).delete();
    },
    async createVerificationToken(verificationToken) {
      // @ts-expect-error Orchid cannot know payload type ahead of time
      const newVerificationToken = await db.verificationToken.create(verificationToken);
      return newVerificationToken as unknown as VerificationToken;
    },
    async useVerificationToken({ identifier, token }) {
      const verificationToken = await db.verificationToken.findBy({ identifier, token });
      return verificationToken as unknown as VerificationToken;
    },
  };
}
