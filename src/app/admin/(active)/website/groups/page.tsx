import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function WebsiteGroups() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <Link href="/admin/website" className="opacity-50">Website</Link> <ArrowRight /> Groups
      </h2>
    </main>
  );
}
