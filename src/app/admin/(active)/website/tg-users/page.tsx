import { DataTable } from "@/components/data-table";
import { ArrowRight } from "lucide-react";
import { columns } from "./columns";
import Link from "next/link";
import { db } from "@/server/db";

export default async function TgUsers() {
  const users = await db.query.tgUsers.findMany();
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <Link href="/admin/website" className="opacity-50">
          Website
        </Link>
        <ArrowRight /> TG Users
      </h2>

      <DataTable columns={columns} data={users} />
    </main>
  );
}
