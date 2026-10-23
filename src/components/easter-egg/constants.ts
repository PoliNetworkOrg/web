import { matchesRoutePrefix } from "@/utils/route-match"
import type { DialogueStep, NavCategory } from "./types"

// omaggio al Forgotten Man / Egg di Deltarune: stanza nascosta raggiungibile solo andando avanti e indietro
export const FORGOTTEN_MAN_PATH = "/egg"
export const TRIGGER_CHANCE = 0.02
export const OBTAINED_STORAGE_KEY = "polinetwork:forgotten-man-egg"
// separato dal precedente: si imposta solo se l'uovo viene accettato
export const RECEIVED_STORAGE_KEY = "polinetwork:forgotten-man-egg-received"

const HOME_PATH = "/"
const GROUPS_PREFIX = "/groups"

export function getCategory(pathname: string): NavCategory {
  if (pathname === HOME_PATH) return "home"
  if (matchesRoutePrefix(pathname, GROUPS_PREFIX)) return "groups"
  return "other"
}

const ASSETS_DIR = "/easter-egg"
export const MUSIC_SRC = { ogg: `${ASSETS_DIR}/man.ogg`, mp3: `${ASSETS_DIR}/man.mp3` }
export const MUSIC_VOLUME = 0.7
export const TEXT_SOUND_SRC = `${ASSETS_DIR}/snd_text.wav`
export const TEXT_SOUND_VOLUME = 0.8
export const EGG_SOUND_SRC = `${ASSETS_DIR}/snd_egg.wav`
export const EGG_SOUND_VOLUME = 0.8

// tutte le misure della stanza sono in "pixel di gioco" (--px) e in tile da 20 pixel di gioco
export const TILE = 20
export const TREE = {
  src: `${ASSETS_DIR}/tree.gif`,
  // dimensioni native della gif e posizione rispetto all'angolo in alto a sinistra della stanza
  width: 106,
  height: 92,
  left: 20,
  top: -21,
}

export const COLORS = {
  floor: "#612c61",
  border: "#ffffff",
  borderInner: "#9da2c4",
  sparkle: "#aaffe6",
  shadowTop: "#4646b0",
  shadowBottom: "#a7a7c9",
  soul: "#ff0000",
}

export const TYPE_DELAY = 35
export const PUNCTUATION_DELAY = 200
export const DIALOGUE_START_DELAY = 1500

export const DIALOGUE: DialogueStep[] = [
  "(C'è qualcuno dietro l'albero.)",
  "Ciao.",
  "Ti ho visto. Avanti e indietro. Avanti e indietro.",
  "Anch'io facevo così, una volta.",
  "Poi, un giorno, la pagina non si è più caricata.",
  "E adesso sono qui.",
  "Ho un uovo.",
  {
    text: "Vuoi l'uovo?",
    choices: [
      { label: "Sì", reply: ["Bene.", { text: "(Hai ricevuto un Uovo.)", event: "receive-egg" }] },
      { label: "No", reply: ["..."] },
    ],
  },
]

// ciò che compare interagendo di nuovo dopo la fine del dialogo
export const EPILOGUE: DialogueStep[] = ["(Non c'è nessuno dietro l'albero.)"]
