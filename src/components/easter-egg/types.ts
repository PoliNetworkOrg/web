export type NavCategory = "home" | "groups" | "other"

export type DialogueChoice = { label: string; reply: DialogueStep[] }
export type DialogueEvent = "receive-egg"
export type DialogueStep =
  | string
  | { text: string; choices: [DialogueChoice, DialogueChoice] }
  // l'evento scatta quando la riga compare
  | { text: string; event: DialogueEvent }
