import { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email: string;
    picture?: string | null;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string | null;
      email: string;
      emailVerified?: Date;
      image?: string | null;
    };
  }
}
