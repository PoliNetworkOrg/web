import { USER_ROLE } from "@/constants";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user.role === USER_ROLE.INACTIVE) redirect("/admin/inactive");

  return children;
}
