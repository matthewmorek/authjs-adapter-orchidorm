import { getAuthorizedUser } from "@/app/(auth)/currentUser";
import { SignOutButton } from "@/app/dashboard/SignOutButton";

export default async function DashboardPage() {
  const user = await getAuthorizedUser();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-xs flex flex-col items-center">
        {user.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt="User Image"
            className="w-32 h-32 rounded-full mb-4"
          />
        )}
        <p className="text-lg font-bold mb-2 whitespace-nowrap">
          User ID: {user.id}
        </p>
        <p className="text-lg mb-2">Name: {user.name}</p>
        <p className="text-lg mb-4">Email: {user.email}</p>
        <SignOutButton />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Dashboard",
};
