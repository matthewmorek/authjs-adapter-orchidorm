import { redirectIfAuthorized } from "@/app/(auth)/currentUser";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await redirectIfAuthorized();

  return <>{children}</>;
}
