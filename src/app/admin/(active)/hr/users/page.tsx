import { DataTable } from "@/components/data-table";
import { ArrowRight } from "lucide-react";
import { columns, type User } from "./columns";
import { db } from "@/server/db";
import { providerMap } from "@/server/auth/config";
import { USER_ROLE } from "@/constants";

export default async function HRUsers() {
  const users = await db.query.users.findMany({ with: { accounts: true } });
  const usersWithProviders: User[] = users
    .map(({ accounts, ...user }) => ({
      ...user,
      accountProviders: accounts.map(
        (a) =>
          providerMap.find((p) => p.id === a.provider)?.name ??
          a.provider
            .split("-")
            .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1))
            .join(" "),
      ),
    }))
    .sort((a, b) => {
      if (a.role === b.role) return 0;
      if (a.role === USER_ROLE.ADMIN_ORG) return -1;
      return 1;
    });

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <span className="opacity-50">HR</span> <ArrowRight /> Users
      </h2>

      <DataTable columns={columns} data={usersWithProviders} />
    </main>
  );
}
