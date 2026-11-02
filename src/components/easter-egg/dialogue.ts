import { DIALOGUE, EPILOGUE } from "./constants"
import type { DialogueExit, DialogueStep } from "./types"

type OpenDialogue = { step: DialogueStep; queue: DialogueStep[]; typed: number; selected: number }
export type DialogueState = { open: OpenDialogue | null; finished: boolean; exit: DialogueExit | null }
export type DialogueAction =
  | { type: "start" }
  | { type: "tick" }
  | { type: "confirm" }
  | { type: "skip" }
  | { type: "move" }
  | { type: "select"; option: number }
  | { type: "choose"; option: number }
  // Esc: non diegetico, ma nessuno deve restare bloccato qui
  | { type: "leave" }

export const initialDialogueState: DialogueState = { open: null, finished: false, exit: null }

export function stepText(step: DialogueStep): string {
  return typeof step === "string" ? step : step.text
}

export function stepChoices(step: DialogueStep) {
  return typeof step !== "string" && "choices" in step ? step.choices : null
}

export function stepEvent(step: DialogueStep) {
  return typeof step !== "string" && "event" in step ? step.event : null
}

function openNext(queue: DialogueStep[]): OpenDialogue | null {
  const [step, ...rest] = queue
  return step === undefined ? null : { step, queue: rest, typed: 0, selected: 0 }
}

function isTyped(open: OpenDialogue): boolean {
  return open.typed >= stepText(open.step).length
}

export function dialogueReducer(state: DialogueState, action: DialogueAction): DialogueState {
  const { open } = state

  // una volta deciso di andarsene non succede più nulla
  if (state.exit) return state
  if (action.type === "leave") return { ...state, open: null, exit: "instant" }

  if (!open) {
    if (action.type === "start" && !state.finished) return { ...state, open: openNext(DIALOGUE) }
    // a dialogo finito, interagire di nuovo mostra l'epilogo
    if (action.type === "confirm" && state.finished) return { ...state, open: openNext(EPILOGUE) }
    return state
  }

  const choices = isTyped(open) ? stepChoices(open.step) : null

  switch (action.type) {
    case "tick":
      return isTyped(open) ? state : { ...state, open: { ...open, typed: open.typed + 1 } }
    case "skip":
      return { ...state, open: { ...open, typed: stepText(open.step).length } }
    case "move":
      if (!choices) return state
      return { ...state, open: { ...open, selected: (open.selected + 1) % choices.length } }
    case "select":
      if (!choices) return state
      return { ...state, open: { ...open, selected: action.option } }
    case "choose": {
      const choice = choices?.[action.option]
      if (!choice) return state
      if (choice.exit) return { ...state, open: null, exit: choice.exit }
      const next = openNext([...(choice.reply ?? []), ...open.queue])
      return { ...state, open: next, finished: state.finished || !next }
    }
    case "confirm": {
      if (!isTyped(open)) return dialogueReducer(state, { type: "skip" })
      if (choices) return dialogueReducer(state, { type: "choose", option: open.selected })
      const next = openNext(open.queue)
      return { ...state, open: next, finished: state.finished || !next }
    }
    case "start":
      return state
  }
}
