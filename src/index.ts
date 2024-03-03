import type { Adapter, AdapterUser } from "next-auth/adapters";
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
  };
}
