import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";

export async function getOptionalUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function getAuthorizedUser() {
  return (await getOptionalUser()) || redirect("/login");
}

export async function redirectIfAuthorized() {
  return (await getOptionalUser()) && redirect("/dashboard");
}
