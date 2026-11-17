export type NavCategory = "home" | "groups" | "other"

// "instant" torna subito al sito, "abrupt" ferma tutto e ci torna dopo una breve pausa
export type DialogueExit = "instant" | "abrupt"
// senza reply né exit la scelta chiude il dialogo e basta
export type DialogueChoice = { label: string; reply?: DialogueStep[]; exit?: DialogueExit }
export type DialogueEvent = "receive-egg"
export type DialogueLine = {
  text: string
  // l'evento scatta quando la riga compare
  event?: DialogueEvent
  // l'ultima riga prima di andarsene: quando compare tace la musica, una volta scritta si esce
  exit?: DialogueExit
  // ms per carattere, al posto della velocità normale
  typeDelay?: number
}
export type DialogueStep = string | DialogueLine | { text: string; choices: [DialogueChoice, DialogueChoice] }
