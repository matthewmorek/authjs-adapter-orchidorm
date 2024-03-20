import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { NextAuthOptions } from "next-auth";
import { OrchidAdapter } from "authjs-adapter-orchidorm";
import { db } from "@/db/db";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("GITHUB_ID or GITHUB_SECRET env vars are missing");
}

export const authOptions: NextAuthOptions = {
  adapter: OrchidAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      from: "from@email",
      sendVerificationRequest: async (params) => {
        console.log("Email verification", params);
      },
    }),
  ],
  session: {
    // jwt or database
    strategy: "database",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser =
        token.email && (await db.user.findByOptional({ email: token.email }));

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};
