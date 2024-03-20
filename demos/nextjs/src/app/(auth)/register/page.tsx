import Link from "next/link";

import { UserAuthForm } from "@/app/(auth)/UserAuthForm";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Create an account</h1>
      <p className="text-lg text-center mb-6">
        Enter your email below to create your account
      </p>
      <UserAuthForm />
      <p className="mt-6">
        Already have an acccount?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
