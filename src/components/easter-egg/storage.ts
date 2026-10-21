import { OBTAINED_STORAGE_KEY, RECEIVED_STORAGE_KEY, TRIGGER_CHANCE } from "./constants"

// vive solo in memoria: un refresh o un accesso diretto all'URL non lo hanno, quindi la stanza resta irraggiungibile
let hasTicket = false

export function hasRoomTicket(): boolean {
  return hasTicket
}

/** Tira il dado: se esce, segna l'uovo come ottenuto per sempre e concede l'accesso alla stanza. */
export function rollForgottenMan(): boolean {
  if (Math.random() >= TRIGGER_CHANCE) return false
  try {
    if (localStorage.getItem(OBTAINED_STORAGE_KEY) !== null) return false
    localStorage.setItem(OBTAINED_STORAGE_KEY, new Date().toISOString())
  } catch {
    // senza storage non possiamo garantire che succeda una volta sola
    return false
  }
  hasTicket = true
  return true
}

export function markEggReceived() {
  try {
    localStorage.setItem(RECEIVED_STORAGE_KEY, new Date().toISOString())
  } catch {
    // senza storage l'uovo resta solo un ricordo
  }
}
