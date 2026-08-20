import type { Metadata } from "next"
import CFUGame from "@/components/cfu-game/CFUGame"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "PoliPac",
  description: "Mangia i CFU, arriva a 180 e laureati! Un mini-gioco stile Pac-Man targato PoliNetwork.",
}

export default function GamePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-400 flex-col items-center justify-center gap-20 px-4 py-49">
      <Hero title="PoliPac" description="Mangia i CFU, arriva a 180 e laureati!" />

      <CFUGame className="w-full max-w-2xl" />
    </main>
  )
}
