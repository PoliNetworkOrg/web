import type { Metadata } from "next"
import { AssociationsList } from "@/components/associations/associations-list"
import { Hero } from "@/components/ui/hero"
import { getAllAssociations } from "@/queries/associations"
import { AssociationsShapes } from "./shapes"

export const metadata: Metadata = {
  title: "Associazioni",
  description: "Scopri le associazioni studentesche del Politecnico",
}

export const dynamic = "force-dynamic"

export default async function AssociationsPage() {
  const associations = await getAllAssociations()

  return (
    <main className="page-layout relative flex flex-col items-center gap-section">
      <AssociationsShapes />
      <Hero title="Associazioni" description="Scopri le associazioni studentesche del Politecnico" />

      <div className="w-full max-w-300">
        <AssociationsList associations={associations} />
      </div>
    </main>
  )
}
