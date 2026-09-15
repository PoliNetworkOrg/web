import { matchesRoutePrefix } from "@/utils/route-match"
import type { EasterEggPhase, NavCategory, PhaseTransition } from "./types"

const HOME_PATH = "/"
const GROUPS_PREFIX = "/groups"

export const TRIGGER_COUNT = 10

// chiavi opzionali perché non tutte le fasi hanno una fase successiva (cioé idle)
export const PHASE_TRANSITIONS: Partial<Record<EasterEggPhase, PhaseTransition>> = {
  glitch: { to: "card", delay: 1200 },
  card: { to: "idle", delay: 10000 },
}

export const PUNCHLINES = [
  "Hai trovato l'easter egg.\nOra torna a studiare.",
  "Avanti e indietro, avanti e indietro...\nTi senti realizzato?",
  `COMPLIMENTI.\nHai sprecato ${TRIGGER_COUNT} click per questo.`,
  "Non c'è nient'altro qui.\nPuoi tornare alla tua vita.",
  "Il PoliNetwork ti osserva\nda quando hai iniziato a cliccare.",
  "Bel tentativo.\nMa qui non succede nient'altro di strano.",
  "Home, Groups, Home, Groups...\nHai capito il concetto di loop?",
]

export function getCategory(pathname: string): NavCategory {
  if (pathname === HOME_PATH) return "home"
  if (matchesRoutePrefix(pathname, GROUPS_PREFIX)) return "groups"
  return "other"
}
