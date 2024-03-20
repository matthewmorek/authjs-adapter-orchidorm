import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "@/app/(auth)/UserAuthForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login to Your Account</h1>
      <p className="text-lg text-center mb-6">
        Please enter your email to sign in.
      </p>
      <UserAuthForm />
      <p className="mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
