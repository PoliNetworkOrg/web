import { ArrowRight } from "lucide-react";

export default async function WebsiteInfo() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <span className="opacity-50">Website</span> <ArrowRight /> Info
      </h2>
    </main>
  );
}
