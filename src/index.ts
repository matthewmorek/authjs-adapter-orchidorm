import type { Adapter, AdapterAccount, AdapterUser } from "next-auth/adapters";
import type { OrchidORM } from "orchid-orm";

export function OrchidAdapter(db: OrchidORM): Adapter {
  return {
    async createUser(payload) {
      const user = await db.user.create(payload);
      return user as unknown as AdapterUser;
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
  };
}
