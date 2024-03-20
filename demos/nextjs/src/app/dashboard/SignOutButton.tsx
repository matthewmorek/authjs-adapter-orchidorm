"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => {
        signOut({
          callbackUrl: `${window.location.origin}/login`,
        });
      }}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Sign Out
    </button>
  );
}
