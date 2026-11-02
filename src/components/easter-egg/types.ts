export type NavCategory = "home" | "groups" | "other"

// "instant" torna subito al sito, "abrupt" ferma tutto e ci torna dopo una breve pausa
export type DialogueExit = "instant" | "abrupt"
// senza reply né exit la scelta chiude il dialogo e basta
export type DialogueChoice = { label: string; reply?: DialogueStep[]; exit?: DialogueExit }
export type DialogueEvent = "receive-egg"
export type DialogueStep =
  | string
  | { text: string; choices: [DialogueChoice, DialogueChoice] }
  // l'evento scatta quando la riga compare
  | { text: string; event: DialogueEvent }
