import { ArrowRight } from "lucide-react";

export default async function SettingsGeneral() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 text-3xl font-bold text-accent-foreground flex items-center gap-2">
        <span className="opacity-50">Settings</span> <ArrowRight /> General
      </h2>
    </main>
  );
}


