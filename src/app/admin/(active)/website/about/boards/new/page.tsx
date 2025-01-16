import { ArrowRight } from "lucide-react";
import Link from "next/link";
import NewAboutBoardForm from "./form";
import { db } from "@/server/db";

export default async function NewAboutBoard() {
  const latest = await db.query.aboutBoards.findFirst({
    orderBy: (t, { asc }) => asc(t.nominatedOn),
  });

  const users = await db.query.tgUsers.findMany({
    orderBy: (t, { asc }) => asc(t.name),
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
        <Link href="/admin/website/about/boards" className="opacity-50">
          Boards
        </Link>{" "}
        <ArrowRight />
        New
      </h2>

      <NewAboutBoardForm nth={(latest?.iterationNum ?? 0) + 1} users={users} />
    </main>
  );
}
