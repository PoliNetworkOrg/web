import { OBTAINED_STORAGE_KEY, RECEIVED_STORAGE_KEY, TRIGGER_CHANCE } from "./constants"

// vive solo in memoria: un refresh o un accesso diretto all'URL non lo hanno, quindi la stanza resta irraggiungibile
// insieme al permesso si ricorda la pagina che la stanza ha preso il posto, per poterci tornare
let ticket: { returnPath: string } | null = null
const listeners = new Set<() => void>()

function setTicket(value: typeof ticket) {
  ticket = value
  for (const listener of listeners) listener()
}

export function hasRoomTicket(): boolean {
  return ticket !== null
}

export function getRoomReturnPath(): string {
  return ticket?.returnPath ?? "/"
}

export function subscribeRoomTicket(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Una volta usciti dalla stanza non ci si torna, nemmeno con avanti/indietro del browser. */
export function revokeRoomTicket() {
  if (ticket) setTicket(null)
}

/** Tira il dado: se esce, segna l'uovo come ottenuto per sempre e concede l'accesso alla stanza. */
export function rollForgottenMan(returnPath: string): boolean {
  if (Math.random() >= TRIGGER_CHANCE) return false
  try {
    if (localStorage.getItem(OBTAINED_STORAGE_KEY) !== null) return false
    localStorage.setItem(OBTAINED_STORAGE_KEY, new Date().toISOString())
  } catch {
    // senza storage non possiamo garantire che succeda una volta sola
    return false
  }
  setTicket({ returnPath })
  return true
}

export function markEggReceived() {
  try {
    localStorage.setItem(RECEIVED_STORAGE_KEY, new Date().toISOString())
  } catch {
    // senza storage l'uovo resta solo un ricordo
  }
}
