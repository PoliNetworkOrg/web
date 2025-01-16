import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { db } from "@/server/db";

export default async function AboutBoards() {
  const boards = await db.query.aboutBoards.findMany({
    orderBy: (t, { asc }) => asc(t.nominatedOn),
  });
  return (
    <main className="container mx-auto grid space-y-8 px-4 py-8">
      <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <Link href="/admin/website" className="opacity-50">
          Website
        </Link>{" "}
        <ArrowRight />
        <Link href="/admin/website/about" className="opacity-50">
          About
        </Link>{" "}
        <ArrowRight />
        Boards
      </h2>

      <div className="grid grid-cols-1 justify-start space-y-4">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-xl font-bold"></h3>
          <Link href="/admin/website/about/boards/new">
            <Button>New</Button>
          </Link>
        </div>
        <DataTable columns={columns} data={boards} />
      </div>
    </main>
  );
}
