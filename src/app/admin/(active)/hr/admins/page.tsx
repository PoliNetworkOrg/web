import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function HRAdmins() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 text-3xl font-bold text-accent-foreground flex items-center gap-2">
        <Link href="/admin/hr" className="opacity-50">HR</Link> <ArrowRight /> Admins
      </h2>
    </main>
  );
}

