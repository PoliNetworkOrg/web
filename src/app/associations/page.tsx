import type { Metadata } from "next"
import { AssociationsList } from "@/components/associations/associations-list"

export const metadata: Metadata = {
  title: "Associazioni",
  description: "Scopri le associazioni studentesche del Politecnico",
}

export default function AssociationsPage() {
  return (
    <main className="w-full">
      <div className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center gap-20 px-4 py-49 md:gap-39">
        <div className="flex flex-col items-center gap-6">
          <h2 className="typo-display-large md:typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent md:py-14">
            Associazioni
          </h2>
          <p className="typo-title-large md:typo-headline-small max-w-2xl text-center">
            Scopri le associazioni studentesche del Politecnico
          </p>
        </div>
        <AssociationsList />
      </div>
    </main>
  )
}
