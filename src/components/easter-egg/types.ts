export type NavCategory = "home" | "groups" | "other"
export type EasterEggPhase = "idle" | "glitch" | "card"

export type PhaseTransition = { to: EasterEggPhase; delay: number }
