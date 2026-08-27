import type { Metadata } from "next"
import { AssociationsList } from "@/components/associations/associations-list"
import { Hero } from "@/components/ui/hero"
import { getAllAssociations } from "@/queries/associations"

export const metadata: Metadata = {
  title: "Associazioni",
  description: "Scopri le associazioni studentesche del Politecnico",
}

export const dynamic = "force-dynamic"

export default async function AssociationsPage() {
  const associations = await getAllAssociations()

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-400 flex-col items-center justify-center gap-20 px-4 py-49 md:gap-39">
      <Hero title="Associazioni" description="Scopri le associazioni studentesche del Politecnico" />

      <div className="w-full max-w-300">
        <AssociationsList associations={associations} />
      </div>
    </main>
  )
}
