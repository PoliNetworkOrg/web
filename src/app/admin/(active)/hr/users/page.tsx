import { DataTable } from "@/components/data-table";
import { ArrowRight } from "lucide-react";
import { columns } from "./columns";
import { db } from "@/server/db";

export default async function HRUsers() {
  const users = await db.query.users.findMany();
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <span className="opacity-50">HR</span> <ArrowRight /> Users
      </h2>

      <DataTable columns={columns} data={users} />
    </main>
  );
}
